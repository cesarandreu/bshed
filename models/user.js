'use strict';

module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define('User', {
    administrator: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
    hashedPassword: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    // paranoid: true,
    classMethods: {
      associate: function associate (models) {
        models.User.hasMany(models.Bikeshed);
        models.User.hasMany(models.Vote);
      }
    },
    instanceMethods: {
    }
  });

  return User;
};
