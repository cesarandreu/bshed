/**
 * Controller loader
 * @flow
 */
import compose from 'koa-compose'
import debug from 'debug'

const log = debug('app:server:controllers')

/**
 * List of controllers to load
 */
export const CONTROLLER_LIST = [
  'users'
]

/**
 * Get all controllers in the list
 * @param {Array<string>} controllerList
 * @return {Object} controllers
 */
export function getControllers (controllerList: Array<string>): Object {
  return controllerList.reduce((controllers, name) => {
    log(`get ${name}`)
    controllers[name] = require(`./${name}_controller.js`)
    return controllers
  }, {})
}

/**
 * Initialize controllers and compose into middleware
 */
export function getMiddleware (controllers: Object): Function {
  return compose(Object.keys(controllers).map(name => {
    log(`middleware ${name}`)
    return controllers[name]()
  }))
}

/**
 * Load and initialize controllers, and compose them into a middleware
 */
export default function controllerLoader (): Function {
  log('start')
  const controllers = getControllers(CONTROLLER_LIST)
  const middleware = getMiddleware(controllers)

  log('end')
  return middleware
}
