module.exports = function (sequelize, DataTypes) {
  const Vote = sequelize.define('Vote', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    UserId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    BikeshedId: {
      type: DataTypes.UUID,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function associate (models) {
        models.Vote.belongsTo(models.Bikeshed)
        models.Vote.belongsTo(models.User)
        models.Vote.hasMany(models.Rating)
      }
    }
  })

  return Vote
}
