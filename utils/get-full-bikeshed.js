const assert = require('assert')
const _ = require('lodash')

/**
 * Get bikeshed with votes
 * @param {Object} params
 * @param {Object} params.models Models
 * @param {number} params.BikeshedId Bikeshed ID
 * @param {Object} params.user Current user instance
 * @returns {Promise<Object>}
 */
module.exports = async function getFullBikeshed ({user, BikeshedId, models}={}) {
  assert(BikeshedId, 'BikeshedId required')
  assert(models, 'models required')

  const UserId = _.get(user, 'id', null)
  const {Bikeshed, Bike, User, Vote, Rating} = models

  // Find bikeshed, include bike and user
  const bikeshed = await Bikeshed.find({
    where: {
      id: BikeshedId
    },
    include: [{
      model: Bike,
      attributes: [
        'id',
        'name',
        'size',
        'type'
      ]
    }, {
      model: User,
      attributes: [
        'id',
        'name'
      ]
    }]
  })

  // Return null if no bikeshed is found
  // Same behavior as Sequelize
  if (!bikeshed)
    return null

  // Get vote count
  const votes = await Vote.count({
    where: {
      BikeshedId: bikeshed.id
    }
  })
  bikeshed.setDataValue('votes', votes || 0)

  // Get bike score and rating
  bikeshed.Bikes = await Promise.all(bikeshed.Bikes.map(async function (bike) {

    const [score, rating] = await Promise.all([
      // score
      Rating.sum('value', {
        where: {
          BikeId: bike.id
        }
      }),

      // rating
      Rating.find({
        where: {
          BikeId: bike.id
        },
        attributes: [
          'value'
        ],
        include: [{
          model: Vote,
          required: true,
          where: {
            BikeshedId,
            UserId
          }
        }]
      })
    ])

    // Score is the total bike score
    bike.setDataValue('score', score || 0)

    // Rating is your personal bike rating
    bike.setDataValue('rating', _.get(rating, 'value', null))

    return bike
  }))

  return bikeshed
}
