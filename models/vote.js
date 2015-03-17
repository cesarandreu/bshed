'use strict';

module.exports = function (sequelize, DataTypes) {
  var Vote = sequelize.define('Vote', {
    value: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    // associations
    BikeshedId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    BikeId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    // paranoid: true,
    classMethods: {
      associate: function associate (models) {
        models.Vote.belongsTo(models.Bike)
        models.Vote.belongsTo(models.Bikeshed)
        models.Vote.belongsTo(models.User)
      },
      asObject: function asObject (votes) {
        var result = {}
        votes.forEach(vote => result[vote.BikeId] = {value: vote.value})
        return result
      }
    }
  })

  return Vote
}
