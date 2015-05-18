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
    UserId: {
      type: DataTypes.UUID,
      allowNull: false
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
