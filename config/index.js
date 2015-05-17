var debug = require('debug')('bshed:config')
var assert = require('assert')
var _ = require('lodash')

/**
 * Configuration objects
 * Each config object has environments as keys
 */
var config = {
  aws: require('./aws'),
  server: require('./server'),
  database: require('./database')
}

/**
 * Config generator
 * Takes optional object to overwrite default configuration
 * @param [env="development"] Desired environment
 * @returns {Object} New configuration object
 */
module.exports = function configGenerator (env) {
  debug('start')

  env = env || process.env.NODE_ENV || 'development'
  debug(`using ${env} env`)

  var config = _.merge({
    env: env,
    middleware: {
      session: {
        key: `bshed-${env}`
      }
    },
    aws: getConfig('aws', env),
    database: getConfig('database', env)
  }, getConfig('server', env))

  debug('end')
  return _.cloneDeep(config)
}

/**
 * Get an environment config out of a config object
 * @param name Desired configuration
 * @param env Desired environment
 */
function getConfig (name, env) {
  assert(config[name], `config ${name} not found`)
  assert(config[name][env], `env ${env} not found in config ${name}`)
  return config[name][env]
}
