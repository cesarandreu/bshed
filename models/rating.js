module.exports = function (sequelize, DataTypes) {
  var Rating = sequelize.define('Rating', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    value: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0
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
    classMethods: {
      associate: function associate (models) {
        models.Rating.belongsTo(models.Bike)
        models.Rating.belongsTo(models.Vote)
      }
    }
  })

  return Rating
}
