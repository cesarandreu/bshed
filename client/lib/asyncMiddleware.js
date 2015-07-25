/**
 * Async middleware
 * @param {Object} [options={}]
 */
export default function asyncMiddleware (options={}) {
  return function asyncMiddlewareInstance ({ dispatch, getState }) {
    return next => action => {
      return typeof action === 'function'
        ? action({ dispatch, getState, ...options })
        : next(action)
    }
  }
}
