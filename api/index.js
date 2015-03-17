var log = require('debug')('bshed:api'),
  compose = require('koa-compose'),
  mount = require('koa-mount'),
  assert = require('assert'),
  qs = require('koa-qs'),
  koa = require('koa')

var loadControllers = require('./controllers'),
  helpers = require('./helpers')

/**
 * API loader
 *
 * requires opts.config, opts.models
 * returns api application
 */
module.exports = function apiLoader ({s3, config, models}={}) {
  assert(s3 && config && models, 'api requires s3, config, and models')
  log('loader start')
  var {name, env, secret, endpoint} = config
  var {addToContext} = helpers.middleware
  var controllers = loadControllers()
  var api = qs(koa())
  Object.assign(api, {
    name, env, secret, config, models, s3, controllers, helpers
  })
  var middleware = compose([
    addToContext({models, s3, helpers}),
    controllers({helpers})
  ])

  api.use(mount(endpoint, middleware))
  log('loader end')
  return api
}
