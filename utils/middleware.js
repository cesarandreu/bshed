var assert = require('assert')

/**
 * Adds all enumerable keys in objects to context
 * @param {Object} [objects={}]
 * @returns {Middleware} addToContextMiddleware
 */
exports.addToContext = function addToContext (objects={}) {
  return function* addToContextMiddleware (next) {
    Object.assign(this, objects)
    yield next
  }
}

/**
 * Loads user to ctx.state.user using session user.id
 * Throw 401 if session isn't set or user isn't found
 * @returns {Middleware} authenticateMiddleware
 */
exports.authenticate = function authenticate () {
  return function* authenticateMiddleware (next) {
    try {
      this.state.user = yield this.models.User.find(this.session.user.id)
    } finally {
      if (!this.state.user)
        this.throw(401)
    }
    yield next
  }
}

/**
 * Handle Joi and Boom errors
 * @returns {Middleware} errorHandlerMiddleware
 */
exports.errorHandler = function errorHandler () {
  return function* errorHandlerMiddleware (next) {
    try {
      yield next
    } catch (err) {
      // console.error('ERR IS', err)
      var [status, body] = errorHandlerHelper(err)
      this.status = status
      this.body = body
    }
  }

  function errorHandlerHelper (err) {
    switch (err.name) {
      case 'ValidationError':
        return [422, err.details]
      default:
        throw err
    }
  }
}

/**
 * Searches for name param using resource model
 * Sets result to ctx.state[name]
 * Throws 404 on failure
 * @example
 * // Uses Bikeshed model, bikeshed param, sets ctx.state.bikeshed
 * load('Bikeshed')
 * @param {String} resource Model name
 * @param {Object} [opts={}] Options
 * @param {String} [opts.name=resource.toLowerCase()] Param value to check
 * @param {String} [opts.key='id'] Searching value to use
 * @returns {Middleware} Model loading middleware
 */
exports.load = function load (resource, {key='id', name=resource.toLowerCase()}={}) {
  assert(resource, 'load middleware requires a resource')
  return function* loadMiddleware (next) {
    this.state[name] = yield this.models[resource].find({
      where: {
        [key]: this.params[name]
      }
    })

    if (!this.state[name])
      this.throw(404, `${resource} not found`)

    yield next
  }
}

/**
 * Middleware to set XSRF-TOKEN cookie on every response
 * @returns {Middleware}
 */
exports.setCsrfToken = function setCsrfToken () {
  return function* setCsrfCookieMidleware (next) {
    yield next

    // Session check needed in case it's null
    if (this.session)
      this.cookies.set('XSRF-TOKEN', this.csrf, {
        httpOnly: false
      })
  }
}

/**
 * Middleware to set logged_in cookie on every response
 * Used by client to try to guess allowed states
 * @returns {Middleware}
 */
exports.setLoggedInCookie = function setLoggedInCookie () {
  return function* setLoggedInCookieMiddleware (next) {
    yield next
    var loggedIn = this.session && this.session.user && this.session.user.name
    this.cookies.set('logged_in', loggedIn ? 'yes' : 'no', {
      httpOnly: false
    })
  }
}
