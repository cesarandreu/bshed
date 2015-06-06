const debug = require('debug')('bshed:api:loader')
const compose = require('koa-compose')
const assert = require('assert')

const controllerLoader = require('./controllers')
const middleware = require('../utils/middleware')
const helpers = require('../utils/helpers')

/**
 * API loader
 * @params {Object} opts
 * @params {Object} opts.s3
 * @params {Object} opts.models
 * @returns {Application} API routes
 */
module.exports = function apiLoader ({models, s3}={}) {
  assert(models && s3, 'api requires models and s3')
  debug('start')

  const api = compose([
    middleware.addToContext({
      helpers,
      models,
      s3
    }),
    controllerLoader()
  ])

  debug('end')
  return api
}
