/**
 * Middleware to expose errors
 */
import debug from 'debug'
const log = debug('server:error')

export function exposeError () {
  return function exposeErrorMiddleware (ctx, next) {
    return next().catch(err => {
      log(err)
      err.expose = true
      return Promise.reject(err)
    })
  }
}
