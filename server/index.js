#!/usr/bin/env node -r babel/register

/**
 * Server loader
 * @flow
 */
import koa from 'koa'
import qs from 'koa-qs'
import debug from 'debug'
import responseTime from 'koa-response-time'

/**
 * Application imports
 */
import * as config from './config'
import modelLoader from './models'
import controllerLoader from './controllers'

/**
 * Initialize models and server
 */
export const models = modelLoader(config.database)
export const server = Object.assign(qs(koa()), {
  name: config.name,
  keys: config.keys,
  env: config.env,
  models: models
})

// Add ctx.models
server.context.models = models

/**
 * Middleware
 */
if (server.env === 'development') {
  const logger = require('koa-logger')
  server.use(logger())
}
server.use(responseTime())
server.use(controllerLoader())

/**
 * Server initializer
 * @param port to listen on
 * @returns server instance
 */
const log = debug('app:server')
export function init (port = config.port) {
  log('initializing server using port ${port}')
  server.instance = server.listen(port, () => log('listening on port ${port}'))
  return server.instance
}

// Initialize server if called directly
if (require.main === module) {
  server.init()
}
