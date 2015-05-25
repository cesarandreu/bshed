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
      associate (models) {
        Rating.belongsTo(models.Bike)
        Rating.belongsTo(models.Vote)
      }
    }
  })

  return Rating
}
