var debug = require('debug')('bshed:api'),
  compose = require('koa-compose'),
  mount = require('koa-mount'),
  assert = require('assert'),
  qs = require('koa-qs'),
  koa = require('koa')

var controllers = require('./controllers'),
  helpers = require('./helpers')

/**
 * API loader
 *
 * requires opts.config, opts.models
 * returns api application
 */
module.exports = function apiLoader ({s3, config, models}={}) {
  assert(s3 && config && models)
  debug('loader:start')
  var {name, env, secret, endpoint} = config
  var api = qs(koa())
  Object.assign(api, {
    name, env, secret, config, models, s3, controllers, helpers
  })
  var middleware = compose([
    addToContext({models, s3, helpers}),
    controllers(helpers)
  ])

  api.use(mount(endpoint, middleware))
  debug('loader:end')
  return api
}

// middleware~
function addToContext (opts={}) {
  return function* addToContextMiddleware (next) {
    Object.assign(this, opts)
    yield next
  }
}
