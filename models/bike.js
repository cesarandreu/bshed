const fs = require('fs')
const assert = require('assert')
const imageSize = require('image-size')

module.exports = function (sequelize, DataTypes) {
  const Bike = sequelize.define('Bike', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    width: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    size: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        max: 5000000,
        min: 0
      }
    },
    type: {
      type: DataTypes.ENUM([
        'image/png',
        'image/jpeg'
      ]),
      allowNull: false,
      validate: {
        isIn: [['image/png', 'image/jpeg']]
      }
    },
    BikeshedId: {
      type: DataTypes.UUID,
      allowNull: false
    }
  }, {
    classMethods: {
      associate (models) {
        Bike.belongsTo(models.Bikeshed)
        Bike.hasMany(models.Rating)
      },

      /**
       * Get dimensions
       * Returns width and height
       * @param {string} File path
       * @returns {Promise<Object>} File dimensions promise
       */
      getDimensions (path) {
        return new Promise((resolve, reject) => {
          imageSize(path, (err, result) => {
            err ? reject(err) : resolve(result)
          })
        })
      },
      /**
       * Upload image to s3
       * @param {Object} s3 Client instance of s3
       * @param {Object} config
       * @param {string} config.BikeId Bike UUID
       * @param {string} config.BikeshedId Bikeshed UUID
       * @param {string} config.path Image location
       * @returns {Promise} Upload image promise
       */
      async uploadImage (s3, {BikeshedId, BikeId, path}={}) {
        assert(s3, 'uploadBike requires s3')
        assert(BikeshedId && BikeId && path, 'uploadImage requires BikeshedId, BikeId, and path')

        const Key = `${BikeshedId}/${BikeId}`
        const Bucket = 'bshed'

        const uploadFileOptions = {
          Body: fs.createReadStream(path),
          ACL: 'public-react',
          Bucket,
          Key
        }

        try {
          await s3.uploadFilePromise(uploadFileOptions)
        } catch (err) {
          await s3.deleteObjectPromise({Bucket, Key})
          throw err
        }
      }
    }
  })

  return Bike
}
