'use strict';

module.exports = function (sequelize, DataTypes) {
  var Bikeshed = sequelize.define('Bikeshed', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
      validate: {
        notEmpty: true
      }
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: '',
      validate: {
        notEmpty: true
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'incomplete',
      validate: {
        isIn: [['incomplete', 'processing', 'open', 'closed']]
      }
    },

    // associations
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    paranoid: true,
    classMethods: {
      associate: function associate (models) {
        models.Bikeshed.hasMany(models.Bike);
        models.Bikeshed.hasMany(models.Vote);
        models.Bikeshed.belongsTo(models.User);
      }
    },
    instanceMethods: {
    }
  });

  return Bikeshed;
};

