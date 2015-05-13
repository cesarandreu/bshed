var debug = require('debug')('bshed:models')
var Sequelize = require('sequelize')
var assert = require('assert')
var path = require('path')
var fs = require('fs')

/**
 * Model loader
 * @param {Object} opts
 * @param {Object} opts.config
 * @returns {Object} Models
 */
module.exports = function modelsLoader ({config}={}) {
  assert(config, 'model loader requires config')
  debug('loader:start')

  var models = {}
  var sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  )

  // Load models
  fs.readdirSync(__dirname)
    .filter(file =>
      file.indexOf('.') !== 0 && file !== 'index.js' && file !== 'test'
    )
    .forEach(file => {
      var modelPath = path.join(__dirname, file)
      var model = sequelize.import(modelPath)
      models[model.name] = model
      debug(`${model.name} loaded from file ${modelPath}`)
    })

  // Associate and initialize models
  Object.keys(models).forEach(name => {
    ['associate', 'initialize'].forEach(action => {
      if (action in models[name]) {
        debug(`${action} ${name}`)
        models[name][action](models)
      }
    })
  })

  models.sequelize = sequelize
  models.Sequelize = Sequelize

  debug('loader:end')
  return models
}
