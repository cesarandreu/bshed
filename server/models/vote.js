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
    ImageId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    paranoid: true,
    classMethods: {
      safeAttributes: ['value'],
      associate: function associate (models) {
        models.Vote.belongsTo(models.Image);
        models.Vote.belongsTo(models.Bikeshed);
        models.Vote.belongsTo(models.User);
      }
    }
  });

  return Vote;
};
