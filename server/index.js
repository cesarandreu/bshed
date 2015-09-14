#!/usr/bin/env node -r babel/register

/**
 * Server loader
 * @flow
 */
import koa from 'koa'
import qs from 'koa-qs'
import path from 'path'
import debug from 'debug'
import fileServer from 'koa-static'
import responseTime from 'koa-response-time'

// import csrf from 'koa-csrf'
import session from 'koa-session'
import * as middleware from './lib/middleware'

// Application imports
import s3Loader from './lib/s3'
import * as config from './config'
import modelLoader from './models'
import loadSchema from './db/schema'
import controllerLoader from './controllers'

// Initialize s3, models, and server
export const s3 = s3Loader(config.aws)
export const models = modelLoader(config.database)
export const server = Object.assign(qs(koa()), {
  // keys: config.keys,
  keys: ['keys'],
  name: config.name,
  env: config.env
})

// Initialize GraphQL schema
export const schema = loadSchema(models)

// Add s3, models, and graphql options to context
server.context.s3 = s3
server.context.models = models
server.context.graphql = {
  schema: schema,
  rootValue: {}
}

// Middleware
if (server.env === 'development') {
  const logger = require('koa-logger')
  server.use(logger())
}

// X-RESPONSE-TIME
server.use(responseTime())

// Expose errors outside of production
server.use(middleware.exposeError(config.env))

// Cookie sessions
server.use(session({ key: 'bshed' }, server))

// CSRF token
// server.use(csrf())

// Set user
server.use(middleware.setUser())

// XSRF-TOKEN
// server.use(middleware.setCsrfToken())

// Controllers
server.use(controllerLoader())

// File server
// server.use(fileServer(path.resolve(__dirname, '../../graphiql/example/dist')))
server.use(fileServer(path.resolve(__dirname, '../build/assets')))

// Server initializer
const log = debug('app:server')
export function init (port = config.port) {
  log(`initializing server using port ${port}`)
  server.instance = server.listen(port, () => log(`listening on port ${port}`))
  return server.instance
}

// Initialize server if called directly
if (require.main === module) {
  init()
}
