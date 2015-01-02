'use strict';

var jwt = require('koa-jwt');

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
    },
    timesVoted: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    paranoid: true,
    classMethods: {
      associate: function associate (models) {
        models.User.hasMany(models.Bikeshed);
        models.User.hasMany(models.Vote);
      }
    },
    instanceMethods: {
      token: function token (opts) {
        var user = {
          id: this.id,
          name: this.name,
          email: this.email
        };

        opts = opts || {};
        opts.expiresInMinutes = opts.expiresInMinutes || 60 * 24 * 7;
        return jwt.sign(user, opts.secret, opts);
      }
    }
  });

  return User;
};
