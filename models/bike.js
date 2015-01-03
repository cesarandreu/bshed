'use strict';

module.exports = function (sequelize, DataTypes) {
  var Bike = sequelize.define('Bike', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: '',
    },
    imageLink: {
      type: DataTypes.STRING,
      allowNull: true
    },
    imageType: {
      type: DataTypes.STRING,
      allowNull: true
    },

    // associations
    BikeshedId: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    paranoid: true,
    getterMethods: {
    },
    classMethods: {
      associate: function associate (models) {
        models.Bike.belongsTo(models.Bikeshed);
        models.Bike.hasMany(models.Vote);
      }
    }
  });

  return Bike;
};
