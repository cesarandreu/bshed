module.exports = function (sequelize, DataTypes) {
  const Bikeshed = sequelize.define('Bikeshed', {
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
      associate (models) {
        Bikeshed.User = Bikeshed.belongsTo(models.User)
        Bikeshed.Bikes = Bikeshed.hasMany(models.Bike)
        Bikeshed.Votes = Bikeshed.hasMany(models.Vote)
        // Bikeshed.belongsTo(models.User)
        // Bikeshed.hasMany(models.Bike)
        // Bikeshed.hasMany(models.Vote)
      }
    }
  })

  return Bikeshed
}
