/**
 * Fetch middleware
 * @flow
 */

/**
 * Handle async fetch action creators
 * @param {Fetcher} fetcher
 * @returns Fetch middleware
 */
export default function fetch ({ fetcher, executeRequest }) {
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
