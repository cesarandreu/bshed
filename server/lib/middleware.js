/**
 * Middleware
 * @flow
 */
import uuid from 'node-uuid'

/**
 * Ensure session.userId is set on every request
 * Create the user if they're don't have an id yet
 * Adds userId to request and req as well
 */
export function setUser () {
  return function * setUserMiddleware (next) {
    const { User, r } = this.models
    if (!this.session.userId) {
      const userId = yield User.create(r)
      this.session.userId = userId
    }
    this.request.userId = this.req.userId = this.session.userId
    yield next
  }
}

/**
 * Adds a uuid to each request
 */
export function setRequestId () {
  return function * setRequestIdMiddleware (next) {
    this.request.requestId = this.req.requestId = uuid.v4()
    yield next
  }
}

/**
 * Middleware to set XSRF-TOKEN cookie on every response
 */
export function setCsrfToken () {
  return function * setCsrfCookieMidleware (next) {
    yield next
    this.cookies.set('XSRF-TOKEN', this.csrf, {
      httpOnly: false
    })
  }
}

/**
 * Middleware to expose errors when not in production mode
 * @TODO: log errors somewhere when in production
 */
export function exposeError (env) {
  return env === 'production'
    ? noopMiddleware
    : exposeErrorMiddleware

  function * exposeErrorMiddleware (next) {
    try {
      yield next
    } catch (err) {
      err.expose = true
      throw err
    }
  }

  function * noopMiddleware (next) {
    return yield next
  }
}
