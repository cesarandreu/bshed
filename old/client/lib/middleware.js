/**
 * Redux middleware
 * @flow
 */

/**
 * Fetch middleware
 * Handle async fetch action creators
 * @param {Object} params
 * @param {Function} fetcher
 * @param {Function} executeRequest
 * @returns fetch middleware
 */
export function fetch ({ fetcher, executeRequest }) {
  return function fetchMiddleware ({ dispatch, getState }) {
    return next => action => {
      // If return value is a function
      if (typeof action === 'function') {
        return action({ dispatch, getState, fetcher, executeRequest })

      // Regular return value
      } else {
        return next(action)
      }
    }
  }
}

/**
 * Log middleware
 * Log actions
 * @returns log middleware
 */
export function logger () {
  return function loggerMiddleware () {
    return next => action => {
      console.groupCollapsed(action.type)
      console.dir(action)
      console.groupEnd()
      return next(action)
    }
  }
}
