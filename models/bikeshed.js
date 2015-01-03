'use strict';

module.exports = function (sequelize, DataTypes) {
  var Bikeshed = sequelize.define('Bikeshed', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    published: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    publishedAt: {
      type: DataTypes.DATE,
      allowNull: true
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
      publish: function* publish (opts) {
        this.published = true;
        this.publishedAt = new Date();
        return yield this.save(opts);
      }
    }
  });

  return Bikeshed;
};

