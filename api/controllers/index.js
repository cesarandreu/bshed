const debug = require('debug')('bshed:api:controllers')
const compose = require('koa-compose')

/**
 * List of controllers to load
 * Kept manually because there's not that many, and it's a little faster
 */
const CONTROLLER_LIST = [
  'authentications',
  'bikesheds',
  'users'
]

/**
 * Controller loader
 * Loads CONTROLLER_LIST
 * Gets each controller's middleware
 * @returns Middleware for all controllers
 */
module.exports = function controllerLoader () {
  debug('start')

  // Load controllers
  const controllers = CONTROLLER_LIST.reduce((controllers, name) => {
    debug(`loading ${name} controller`)
    controllers[name] = require(`./${name}_controller.js`)
    return controllers
  }, {})

  // Get middleware
  const middleware = compose(Object.keys(controllers).map(name => {
    debug(`getting middleware for ${name} controller`)
    return controllers[name]()
  }))

  debug('end')
  return middleware
}
