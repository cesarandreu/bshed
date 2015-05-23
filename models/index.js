const ssaclAttributeRoles = require('ssacl-attribute-roles')
const debug = require('debug')('bshed:models')
const Sequelize = require('sequelize')
const assert = require('assert')
const path = require('path')
const fs = require('fs')

/**
 * Models loader
 * @param {Object} config
 * @returns {Object} Models
 */
module.exports = function modelsLoader (config) {
  assert(config, 'model loader requires config')
  debug('loader:start')

  const models = {}
  const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  )

  ssaclAttributeRoles(sequelize)

  // Load models
  fs.readdirSync(__dirname)
    .filter(file =>
      file.indexOf('.') !== 0 && file !== 'index.js' && file !== 'test'
    )
    .forEach(file => {
      const modelPath = path.join(__dirname, file)
      const model = sequelize.import(modelPath)
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
