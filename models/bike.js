'use strict';

module.exports = function (sequelize, DataTypes) {
  var Bike = sequelize.define('Bike', {
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
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        isInt: true,
        min: 0
      }
    },
    imageName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    imageType: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isIn: [['image/png', 'image/jpeg']]
      }
    },

    // associations
    BikeshedId: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    // paranoid: true,
    getterMethods: {
      bucket: function () {
        return 'bikesheds';
      },
      key: function () {
        return this.BikeshedId + '/' + this.imageName;
      }
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
