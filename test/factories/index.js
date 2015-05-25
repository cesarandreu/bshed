const fs = require('fs')
const _ = require('lodash')
const path = require('path')
const mmm = require('mmmagic')
const assert = require('assert')
const chance = require('chance').Chance()
const uploadBike = require('../../utils/upload-bike')
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
  async function createBike (opts={}) {
    _.defaults(opts, {
      file: `${fixtures}/puppy_0${_.random(1, 4)}.jpg`
    })

    _.defaults(opts, {
      type: await getFileType(opts.file),
      size: await getFileSize(opts.file),
      name: path.basename(opts.file)
    })

    const bikeshed = opts.BikeshedId
      ? await Bikeshed.findById(opts.BikeshedId)
      : await createBikeshed()

    Object.assign(opts, {
      BikeshedId: bikeshed.id
    })

    const bike = await Bike.create(opts)
    try {
      await uploadBike(s3, {
        file: opts.file,
        BikeId: bike.id,
        BikeshedId: bike.BikeshedId
      })
    } catch (err) {
      await bike.destroy()
      throw err
    }

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
   * @param {Object} opts
   * @param {String} [opts.UserId]
   * @param {String} [opts.BikeshedId]
   * @param {Number} [opts.bikes=2] Desired bike count
   * @param {Number} [opts.votes=5] Desired vote count
   * @returns {Promise} Promise to all models
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
 * @param {String} file File path
 * @returns {Promise<String>} File type promise
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
 * @returns {Promise<Number>} File size promise
 */
function getFileSize (file) {
  return new Promise((resolve, reject) => {
    fs.stat(file, (err, stats) => {
      err ? reject(err) : resolve(stats.size)
    })
  })
}
