#!/usr/bin/env node -r babel/register
/**
 * Server loader
 */
import koa from 'koa'
import qs from 'koa-qs'
import path from 'path'
import debug from 'debug'
import send from 'koa-send'
import session from 'koa-session'
import fileServer from 'koa-static'
import responseTime from 'koa-response-time'

// Application imports
import * as config from './config'
import modelLoader from './models'
import loadSchema from './data/schema'
import createUploader from './lib/uploader'
import GraphQLController from './lib/graphql'
import * as middleware from './lib/middleware'
import { getJobCreator } from './lib/image-queue'

const ASSETS_PATH = path.resolve(__dirname, '../build/assets/')

// Initialize image queue, uploader, models, and server
const createImageJob = getJobCreator(config.queue)
const uploader = createUploader(config.aws)
const models = modelLoader(config.database)
const server = Object.assign(qs(koa()), {
  keys: config.keys,
  name: config.name,
  env: config.env
})

// Initialize GraphQL schema
const schema = loadSchema(models)

// Add uploader, models, and graphql options to context
server.context.uploader = uploader
server.context.models = models
server.context.graphql = {
  schema: schema,
  rootValue: {
    IMAGE_ROOT: 'localhost:10001',
    createImageJob: createImageJob
  }
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

// Set requestId
server.use(middleware.setRequestId())

// Cookie sessions
server.use(session({ key: 'bshed' }, server))

// Set user
server.use(middleware.setUser())

// Controllers
server.use(GraphQLController())

// File server
server.use(fileServer(ASSETS_PATH))
server.use(function * () {
  yield send(this, 'index.html', { root: ASSETS_PATH })
})

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
