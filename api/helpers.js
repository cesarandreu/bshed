var assert = require('assert'),
  wait = require('co-wait'),
  _ = require('lodash'),
  co = require('co')

module.exports = {
  retry, noop,
  middleware: {load, auth}
}

/**
 * retry
 * ripped off from co-retry
 */
function* retry (fn, {attempts=3, interval=300, delta=150}={}) {
  while (true) {
    try {
      return yield co(fn)
    } catch (err) {
      if (!(attempts--)) throw err
      yield wait(_.random(interval - delta, interval + delta))
    }
  }
}

/**
 * load
 *
 * Searches for :name param using resource model and sets value to ctx.state[name]
 * Throws 404 if authorization or search fails
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
function load (resource, {parent, key='id', name=resource.toLowerCase()}={}) {
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
 * auth
 *
 * Loads user to ctx.state.user using session user.id
 * Throws 401 if session is not set or user isn't found
 */
function auth ({skippable=false}={}) {
  return function* authMiddleware (next) {
    try {
      this.state.user = yield this.models.User.find(this.session.user.id)
      if (!this.state.user) throw new Error('user not found')
    } catch (err) {
      if (!skippable) this.throw(401)
    }
    yield next
  }
}

// do nothing
function noop () {}
