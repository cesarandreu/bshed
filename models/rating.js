const _ = require('lodash')
const createError = require('http-errors')

module.exports = function (sequelize, DataTypes) {
  const Rating = sequelize.define('Rating', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    value: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        max: 12,
        min: 1
      }
    },
    BikeId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    VoteId: {
      type: DataTypes.UUID,
      allowNull: false
    }
  }, {
    hooks: {
      async beforeBulkCreate (ratings, opts) {
        // Check for missing values
        const missingValues = _.difference(
          _.range(1, ratings.length),
          _.pluck(ratings, 'value')
        )
        if (missingValues.length !== 0) {
          throw createError(422, `Missing values ${JSON.stringify(missingValues)}`, {
            expose: true
          })
        }
      }
    },
    classMethods: {
      associate (models) {
        Rating.belongsTo(models.Bike)
        Rating.belongsTo(models.Vote)
      }
    }
  })

  return Rating
}
