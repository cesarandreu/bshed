/**
 * Logger middleware
 * @flow
 */

/**
 * Log actions
 * @returns Logger middleware
 */
export default function logger () {
  return function loggerMiddleware () {
    return next => action => {
      console.groupCollapsed(action.type)
      console.dir(action)
      console.groupEnd()
      return next(action)
    }
  }
}
