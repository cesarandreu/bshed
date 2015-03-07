'use strict'

var Sequelize = require('sequelize'),
  path = require('path'),
  fs = require('fs')

var assert = require('assert'),
  debug = require('debug')('bshed:models')

/**
 * Model loader
 *
 * requires opts.database
 * returns models object
 */
module.exports = function modelsLoader (opts) {
  assert(opts)
  assert(opts.database)
  debug('loader:start')

  var models = {},
    config = opts.database,
    sequelize = new Sequelize(config.database, config.username, config.password, config)

  // Load models
  fs.readdirSync(__dirname)
  .filter( file => file.indexOf('.') !== 0 && file !== 'index.js')
  .forEach(file => {
    var modelPath = path.join(__dirname, file)
    var model = sequelize.import(modelPath)
    models[model.name] = model
    debug('%s loaded from file %s', model.name, modelPath)
  })

  // Associate and initialize models
  Object.keys(models).forEach(name => {
    ['associate', 'initialize'].forEach(action => {
      if (action in models[name]) {
        debug(`${action} ${name}`)
        models[name].associate(models)
      }
    })
  })

  models.sequelize = sequelize
  models.Sequelize = Sequelize

  debug('loader:end')
  return models
}
