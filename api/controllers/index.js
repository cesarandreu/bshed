import debug from 'debug'
import compose from 'koa-compose'
const log = debug('bshed:api:controllers')

/**
 * List of controllers to load
 * Kept manually because there's not that many, and it's a little faster
 */
export const CONTROLLER_LIST = [
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
export default function controllerLoader () {
  log('start')

  // Load controllers
  const controllers = CONTROLLER_LIST.reduce((controllers, name) => {
    log(`loading ${name} controller`)
    controllers[name] = require(`./${name}_controller.js`)
    return controllers
  }, {})

  // Get middleware
  const middleware = compose(Object.keys(controllers).map(name => {
    log(`getting middleware for ${name} controller`)
    return controllers[name]()
  }))

  log('end')
  return middleware
}
