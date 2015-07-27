/**
 * Helpers for testing actions
 * @flow
 */

/**
 * Resolve action creator return function with dispatch value
 * Use with action creators that return a function and dispatch once
 * @param {Function} actionFunction Return value of an action creator
 * @param {Object} [options={}] Other params to pass to the action
 * @returns {Promise} Promise of single dispatch value
 */
export function resolveWithDispatchValue (action: Function, options={}) {
  return new Promise(resolve => {
    action({ dispatch: resolve, ...options })
  })
}
