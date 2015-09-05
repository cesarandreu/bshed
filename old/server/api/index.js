import addToContext from 'koa-add-to-context'
import compose from 'koa-compose'
import assert from 'assert'
import debug from 'debug'

import controllerLoader from './controllers'
import helpers from '../utils/helpers'

const log = debug('bshed:api:loader')

/**
 * API loader
 * @params {Object} opts
 * @params {Object} opts.s3
 * @params {Object} opts.models
 * @returns {Application} API routes
 */
export default function apiLoader ({models, s3}={}) {
  assert(models && s3, 'api requires models and s3')
  log('start')

  const api = compose([
    addToContext({
      helpers,
      models,
      s3
    }),
    controllerLoader()
  ])

  log('end')
  return api
}
