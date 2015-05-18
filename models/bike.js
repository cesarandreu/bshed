module.exports = function (sequelize, DataTypes) {
  var Bike = sequelize.define('Bike', {
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
    size: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        max: 5000000,
        min: 0
      }
    },
    type: {
      type: DataTypes.ENUM('image/png', 'image/jpeg'),
      allowNull: false,
      validate: {
        isIn: [['image/png', 'image/jpeg']]
      }
    },
    BikeshedId: {
      type: DataTypes.UUID,
      allowNull: false,
      validate: {
        isUUID: true
      }
    }
  }, {
    classMethods: {
      associate: function associate (models) {
        models.Bike.belongsTo(models.Bikeshed)
        models.Bike.hasMany(models.Rating)
      }
    }
  })

  return Bike
}
