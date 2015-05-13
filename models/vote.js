module.exports = function (sequelize, DataTypes) {
  var Vote = sequelize.define('Vote', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    UserId: {
      type: DataTypes.UUID,
      allowNull: false,
      validate: {
        isUUID: true
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
        models.Vote.belongsTo(models.Bikeshed)
        models.Vote.belongsTo(models.User)
        models.Vote.hasMany(models.Rating)
      }
    }
  })

  return Vote
}
