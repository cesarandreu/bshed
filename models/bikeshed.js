module.exports = function (sequelize, DataTypes) {
  var Bikeshed = sequelize.define('Bikeshed', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: ''
    },
    status: {
      type: DataTypes.ENUM('building', 'success', 'error', 'deleted'),
      allowNull: false,
      defaultValue: 'building',
      validate: {
        isIn: [['building', 'success', 'error', 'deleted']]
      }
    },
    UserId: {
      type: DataTypes.UUID,
      allowNull: false,
      validate: {
        isUUID: true
      }
    }
  }, {
    classMethods: {
      associate: function associate (models) {
        models.Bikeshed.belongsTo(models.User)
        models.Bikeshed.hasMany(models.Bike)
        models.Bikeshed.hasMany(models.Vote)
      }
    }
  })

  return Bikeshed
}
