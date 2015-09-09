const ssaclAttributeRoles = require('ssacl-attribute-roles')
const debug = require('debug')('bshed:models')
const Sequelize = require('sequelize')
const assert = require('assert')

/**
 * List of models to load
 * Kept manually because there's not that many, and it's a little faster
 */
const MODEL_LIST = [
  'bike',
  'bikeshed',
  'rating',
  'user',
  'vote'
]

/**
 * Models loader
 * @param {Object} config
 * @returns {Object} Models
 */
module.exports = function modelsLoader (config) {
  assert(config, 'model loader requires config')
  debug('loader:start')

  // Create sequelize instance
  const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  )

  // Reference: https://github.com/mickhansen/ssacl-attribute-roles
  // Attribute whitelisting/blacklisting with roles
  ssaclAttributeRoles(sequelize)

  // Load all the models
  const models = MODEL_LIST.reduce((models, name) => {
    debug(`loading ${name} model`)
    const model = require(`./${name}.js`)(sequelize, Sequelize)
    models[model.name] = model
    return models
  }, {
    sequelize,
    Sequelize
  })

  // Associate and initialize models
  Object.keys(models).forEach(name => {
    if ('associate' in models[name]) {
      debug(`associate ${name}`)
      models[name].associate(models)
    }
  })

  debug('loader:end')
  return models
}
