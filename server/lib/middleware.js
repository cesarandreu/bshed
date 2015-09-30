/**
 * Middleware
 * @flow
 */

/**
 * Ensure session.userId is set on every request
 * Create the user if they're don't have an id yet
 */
export function setUser () {
  return function * setUserMiddleware (next) {
    const { User, r } = this.models
    if (!this.session.userId) {
      const userId = yield User.create(r)
      this.session.userId = userId
    }
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
