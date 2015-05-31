const _ = require('lodash')
const assert = require('assert')
const uuid = require('node-uuid')
const helpers = require('./helpers')

/**
 * Check Joi schema
 * @param {Object} schema Joi schema to check
 * @returns {GeneratorFunction} checkSchemaMiddleware
 */
exports.checkSchema = function checkSchema (schema) {
  assert(schema, 'checkSchema requires schema')
  return function* checkSchemaMiddleware (next) {
    this.state.body = yield helpers.checkSchema(this.request.body, schema)
    yield next
  }
}

/**
 * Adds all enumerable keys in objects to context
 * @param {Object} [objects={}]
 * @returns {GeneratorFunction} addToContextMiddleware
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
 * @returns {GeneratorFunction} authenticateMiddleware
 */
exports.authenticate = function authenticate () {
  return function* authenticateMiddleware (next) {
    try {
      const [user] = yield this.models.User.findOrCreate({
        where: {
          id: this.session.user.id
        }
      })

      this.state.user = user
    } finally {
      this.assert(this.state.user, 401)
    }
    yield next
  }
}

/**
 * Assign session.user.id for every request
 * Gives the user a UUID if they don't have one
 * @returns {GeneratorFunction} setUserMiddleware
 */
exports.setUser = function setUser () {
  return function* setUserMiddleware (next) {
    const userId = _.get(this.session, 'user.id', uuid.v4())
    _.set(this.session, 'user.id', userId)

    yield next
  }
}

/**
 * Searches for name param using resource model
 * Sets result to ctx.state[name]
 * Throws 404 on failure
 * @example
 * // Uses Bikeshed model, bikeshed param, sets ctx.state.bikeshed
 * load('Bikeshed')
 * @param {string} resource Model name
 * @param {Object} [opts={}] Options
 * @param {string} [opts.name=resource.toLowerCase()] Param value to check
 * @param {string} [opts.key='id'] Searching value to use
 * @returns {GeneratorFunction} Model loading middleware
 */
exports.load = function load (resource, {key='id', name=resource.toLowerCase()}={}) {
  assert(resource, 'load middleware requires a resource')
  return function* loadMiddleware (next) {
    this.state[name] = yield this.models[resource].find({
      where: {
        [key]: this.params[name]
      }
    })

    this.assert(this.state[name], 404, `${resource} not found`)
    yield next
  }
}

/**
 * Middleware to set XSRF-TOKEN cookie on every response
 * @returns {GeneratorFunction} setCsrfCookieMidleware
 */
exports.setCsrfToken = function setCsrfToken () {
  return function* setCsrfCookieMidleware (next) {
    yield next

    this.cookies.set('XSRF-TOKEN', this.csrf, {
      httpOnly: false
    })
  }
}

/**
 * Middleware to set logged_in cookie on every response
 * Used by client to try to guess allowed states
 * @returns {GeneratorFunction} setLoggedInCookieMiddleware
 */
exports.setLoggedInCookie = function setLoggedInCookie () {
  return function* setLoggedInCookieMiddleware (next) {
    yield next
    const loggedIn = _.get(this, 'session.user.id', null)
    this.cookies.set('logged_in', loggedIn ? 'yes' : 'no', {
      httpOnly: false
    })
  }
}

/**
 * Middleware to expose errors when not in production mode
 * @returns {GeneratorFunction} exposeErrorMiddleware
 */
exports.exposeError = function exposeError () {
  return function* exposeErrorMiddleware (next) {
    try {
      yield next
    } catch (err) {
      if (this.env !== 'production')
        err.expose = true

      throw err
    }
  }
}
