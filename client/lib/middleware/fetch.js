/**
 * Fetch middleware
 * @flow
 */
// import { addMessage } from '../actions/MessageActions'

/**
 * Handle async fetch action creators
 * @param {Fetcher} fetcher
 * @returns Fetch middleware
 */
export default function fetch (fetcher) {
  return function fetchMiddleware ({ dispatch, getState }) {
    return next => action => {
      // If return value is a function
      if (typeof action === 'function') {
        return action({ dispatch, getState, fetcher })

      // // If return value includes a request function
      // } else if (typeof action.request === 'function') {
      //   const { request, types, ...other } = action
      //   const [PENDING, FULFILED, REJECTED] = types
      //   next({ ...other, type: PENDING })
      //   return fetcher.executeRequest(request, { ...other })
      //     .then(async response => {
      //       if (response.ok) {
      //         const data = await response.json()
      //         next({ response, payload: data, type: FULFILED })
      //       } else {
      //         const message = `HTTP - ${response.status} - ${response.statusText}`
      //         dispatch(addMessage(message, 'error'))

      //         const error = new Error(message)
      //         next({ payload: { error, response }, error: true, type: REJECTED })
      //       }
      //     })
      //     .catch(error => next({ payload: { error }, error: true, type: REJECTED }))

      // Regular return value
      } else {
        return next(action)
      }
    }
  }
}
