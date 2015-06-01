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
      }
    }
  })

  return Bike
}
