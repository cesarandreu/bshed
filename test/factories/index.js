const fs = require('fs')
const _ = require('lodash')
const path = require('path')
const mmm = require('mmmagic')
const assert = require('assert')
const chance = require('chance').Chance()
const fixtures = path.resolve(__dirname, '../fixtures')

const Magic = mmm.Magic
const magic = new Magic(mmm.MAGIC_MIME_TYPE)

/**
 * Build factories
 * @param {Object} models Initialized models
 * @param {Object} s3 Initialized and wrapped s3 client
 * @returns {Object} Factories
 */
module.exports = function buildFactories (models, s3) {
  assert(models, 'Factories require models')
  assert(s3, 'Factories require s3')

  const {Rating, User, Bikeshed, Bike, Vote} = models

  return {
    createUser,
    createBike,
    createVote,
    createRating,
    createBikeshed,
    createPopulatedBikeshed
  }

  /**
   * Create user
   */
  async function createUser (opts={}) {
    _.defaults(opts, {
      name: chance.name(),
      email: chance.email(),
      password: 'password'
    })

    Object.assign(opts, {
      hashedPassword: opts.hashedPassword || await User.hashPassword(opts.password)
    })

    return await User.create(opts)
  }

  /**
   * Create bikeshed
   */
  async function createBikeshed (opts={}) {
    _.defaults(opts, {
      description: chance.sentence()
    })

    const user = opts.UserId
      ? await User.findById(opts.UserId)
      : await createUser()

    Object.assign(opts, {
      UserId: user.id
    })

    return await Bikeshed.create(opts)
  }

  /**
   * Create bike
   */
  async function createBike ({BikeshedId, file={}}={}) {
    _.defaults(file, {
      path: `${fixtures}/puppy_0${_.random(1, 4)}.jpg`
    })

    _.defaults(file, {
      type: await getFileType(file.path),
      size: await getFileSize(file.path),
      name: path.basename(file.path)
    })

    const bikeshed = BikeshedId
      ? await Bikeshed.findById(BikeshedId)
      : await createBikeshed()

    const bike = await Bike.createAndUpload({
      BikeshedId: bikeshed.id,
      file
    }, {
      s3
    })

    return bike
  }

  /**
   * Create vote
   */
  async function createVote (opts={}) {
    const user = opts.UserId
      ? await User.findById(opts.UserId)
      : await createUser()

    const bikeshed = opts.BikeshedId
      ? await Bikeshed.findById(opts.BikeshedId)
      : await createBikeshed({UserId: opts.UserId})

    Object.assign(opts, {
      BikeshedId: bikeshed.id,
      UserId: user.id
    })

    return await Vote.create(opts)
  }

  /**
   * Create rating
   */
  async function createRating (opts={}) {
    const vote = opts.VoteId
      ? await Vote.findById(opts.VoteId)
      : await createVote()

    const bike = opts.BikeId
      ? await Bike.findById(opts.BikeId)
      : await createBike({BikeshedId: vote.BikeshedId})

    const value = opts.value || await Bike.count({where: {BikeshedId: vote.BikeshedId}})

    Object.assign(opts, {
      VoteId: vote.id,
      BikeId: bike.id,
      value: value
    })

    return await Rating.create(opts)
  }

  /**
   * Create populated Bikeshed
   * @param {Object} [opts={}]
   * @param {string} [opts.UserId]
   * @param {string} [opts.BikeshedId]
   * @param {number} [opts.bikes=2] Desired bike count
   * @param {number} [opts.votes=5] Desired vote count
   * @returns {Promise<Object>} Promise to all created instances
   */
  async function createPopulatedBikeshed (opts={}) {
    _.defaults(opts, {
      bikes: 2,
      votes: 5
    })

    const user = opts.UserId
      ? await User.findById(opts.UserId)
      : await createUser()

    const bikeshed = opts.BikeshedId
      ? await Bikeshed.findById(opts.BikeshedId)
      : await createBikeshed({UserId: user.id})

    const bikes = await Promise.all(_.times(opts.bikes, n =>
      createBike({
        BikeshedId: bikeshed.id
      })
    ))

    const votes = await Promise.all(_.times(opts.votes, n =>
      createVote({
        BikeshedId: bikeshed.id
      })
    ))

    const ratings = await Promise.all(votes.map(vote =>
      Rating.bulkCreate(_.shuffle(bikes).map((bike, idx) =>
        ({
          BikeId: bike.id,
          VoteId: vote.id,
          value: idx
        })
      ))
    ))

    return {
      user,
      votes,
      bikes,
      ratings,
      bikeshed
    }
  }

}

// Private helpers

/**
 * Get file mime type
 * @param {string} file File path
 * @returns {Promise<string>} File type promise
 */
function getFileType (file) {
  return new Promise((resolve, reject) => {
    magic.detectFile(file, (err, result) => {
      err ? reject(err) : resolve(result)
    })
  })
}

/**
 * Get file size
 * @param {String} file File path
 * @returns {Promise<number>} File size promise
 */
function getFileSize (file) {
  return new Promise((resolve, reject) => {
    fs.stat(file, (err, stats) => {
      err ? reject(err) : resolve(stats.size)
    })
  })
}
