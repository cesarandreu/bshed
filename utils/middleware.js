var assert = require('assert')
var _ = require('lodash')

/**
 * addToContext
 * Adds all enumerable keys in objects to context
 * @param {Object} [objects={}]
 * @returns {Function} addToContextMiddleware
 */
exports.addToContext = function addToContext (objects={}) {
  return function* addToContextMiddleware (next) {
    Object.assign(this, objects)
    yield next
  }
}

/**
 * auth
 *
 * Loads user to ctx.state.user using session user.id
 * Throws 401 if session is not set or user isn't found
 */
exports.authenticate = function authenticate ({skippable=false}={}) {
  return function* authenticateMiddleware (next) {
    try {
      this.state.user = yield this.models.User.find(this.session.user.id)
      if (!this.state.user) throw new Error('user not found')
    } catch (err) {
      if (!skippable) this.throw(401)
    }
    yield next
  }
}

/**
 * errorHandler
 * Handle Joi and Boom errors
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
 * load
 * Searches for :name param using resource model and sets value to ctx.state[name]
 * Throws 404 if search fails
 *
 * param resource - model name
 * param opts.name - param value to use. default: resource.toLowerCase()
 * param opts.key - searching value to use. default: id
 * param opts.parent - include parent in where, like resource
 * param opts.parent.resource - model name
 * param opts.parent.name - param value to use. default: parent.resource.toLowerCase()
 * param opts.parent.through - association key to use. default: ${parent.resource}Id
 * param opts.parent.key - parent.use key to check. default: id
 *
 * example load('Bikeshed') - uses Bikeshed model, :bikeshed param, and sets ctx.state.bikeshed
 */
exports.load = function load (resource, {parent, key='id', name=resource.toLowerCase()}={}) {
  assert(resource, 'load middleware requires a resource')
  if (parent) {
    if (_.isString(parent)) parent = {resource: parent}
    parent = _.assign({
      name: parent.resource.toLowerCase(),
      through: `${parent.resource}Id`,
      key: 'id'
    }, parent)
  }

  return function* loadMiddleware (next) {
    // inside of try-catch in case any key is incorrect
    try {
      var params = {
        where: {[key]: this.params[name]}
      }
      if (parent) params.where[parent.through] = this.state[parent.name][parent.key]
      this.state[name] = yield this.models[resource].find(params)
      if (!this.state[name]) throw new Error(`${resource} not found`)
    } catch (err) {
      this.throw(404, `${resource} not found`)
    }
    yield next
  }
}

/**
 * setCsrfToken
 * Middleware to set XSRF-TOKEN cookie on every response
 * Session check is needed in case it's null
 */
exports.setCsrfToken = function setCsrfToken () {
  return function* setCsrfCookieMidleware (next) {
    yield next
    if (this.session)
      this.cookies.set('XSRF-TOKEN', this.csrf, {httpOnly: false})
  }
}

/**
 * setLoggedInCookie
 * Middleware to set logged_in cookie on every response
 * Used by client to try to guess allowed states
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
