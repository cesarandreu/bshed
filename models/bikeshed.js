'use strict'

var _ = require('lodash')

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
        isIn: [['incomplete', 'open', 'closed']]
      }
    },
    size: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },

    openedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    closedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },

    // associations
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    // paranoid: true,
    classMethods: {
      associate: function associate (models) {
        models.Bikeshed.hasMany(models.Bike)
        models.Bikeshed.hasMany(models.Vote)
        models.Bikeshed.belongsTo(models.User)
      }
    },
    instanceMethods: {
    },
    validate: {
      statusSize: function statusSize () {
        if (this.get('status') === 'open' && this.get('size') < 2) {
          throw new Error('must have at least two bikes')
        }
      },
      statusTransition: function statusTransition () {
        var changes = {incomplete: 'open', open: 'closed'},
          previous = this.previous('status'), status = this.get('status')
        if (this.changed('status') && previous && status !== changes[previous]) {
          throw new Error(`unexpected status transition ${status}`)
        }
      },
      statusDate: function () {
        var status = this.get('status')
        if (status === 'open' && !_.isDate(this.get('openedAt'))) {
          throw new Error('must have openedAt date to open')
        } else if (status === 'closed' && !_.isDate(this.get('closedAt'))) {
          throw new Error('must have closedAt date to close')
        }
      }
    }
  })

  return Bikeshed
}

