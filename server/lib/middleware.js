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
    const { User } = this.models
    if (!this.session.userId) {
      try {
        const user = yield User.create()
        this.session.userId = user.id
      } catch (err) {
        console.error('setUserMiddleware', err)
        throw err
      }
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
 */
export function exposeError (env) {
  const isProduction = env === 'production'
  return function * exposeErrorMiddleware (next) {
    try {
      yield next
    } catch (err) {
      if (!isProduction) {
        err.expose = true
      }
      throw err
    }
  }
}