#!/usr/bin/env node -r bshed-requires
import Koa from 'koa'
import debug from 'debug'
import convert from 'koa-convert'
import session from 'koa-session'
// import DataLoader from 'dataloader'
const log = debug('server:loader')

// Server libraries
import assets from './lib/assets'
import graphiql from './lib/graphiql'
import graphqlHTTP from './lib/graphql'
import imageProxy from './lib/imageProxy'
import requestId from './lib/requestId'
import Router from './lib/router'
// import setCsrfToken from './lib/setCsrfToken'
import setUser from './lib/setUser'
import uploader from './lib/uploader'

// Config, models, schema, queue
import * as config from '../config'
import createModels from './models'
import createSchema from './schema'
import Queue from 'bull'

// Build models
const { database } = config
const models = createModels({ database })

// Build queues
const { PROCESS_IMAGE_WORKER_QUEUE, redis } = config
const { port, host, ...redisConfig } = redis
const processImageQueue = new Queue(PROCESS_IMAGE_WORKER_QUEUE, port, host, redisConfig)
const queues = {
  processImageQueue
}

// Build schema
const schema = createSchema({
  // models,
  // queues
})

// Create and configure server
const app = new Koa()
app.keys = config.keys
app.env = config.env
Object.assign(app.context, {
  models,
  schema,
  queues
})

/**
 * Global middleware
 */

// Log requests in development
if (config.env === 'development') {
  const logger = require('koa-logger')
  app.use(logger())
}

// Expose errors outside of production
if (config.env !== 'production') {
  const { exposeError } = require('./lib/exposeError')
  app.use(exposeError(config.env))
}

// Add unique id to each request
app.use(requestId())

// Cookie sessions
app.use(convert(session({ key: 'bshed' }, app)))

// Set session userId
app.use(setUser())

// Set csrf token cookie
// @TODO: Add csrf token validator
// @TODO: Enable csrf cookie setter
// app.use(setCsrfToken())

// Routes
// @TODO: Clean this up
const router = new Router()
.addRoute({
  methods: ['GET'],
  path: '/images/:bikeshedId/:bikeKey/:size',
  middleware: imageProxy(config.aws)
})
.addRoute({
  methods: ['GET'],
  path: '/graphiql',
  middleware: graphiql({
    enabled: true
  })
})
.addRoute({
  methods: ['GET', 'POST'],
  path: '/graphql',
  middleware: [
    uploader(config.aws),
    graphqlHTTP(getGraphqlOptions)
  ]
})

function getGraphqlOptions (ctx) {
  const rootValue = {
    files: ctx.request.files || {},
    // loaders: {
    //   Bikeshed: new DataLoader(models.Bikeshed.batchLoad),
    //   User: new DataLoader(models.User.batchLoad),
    //   Vote: new DataLoader(models.Vote.batchLoad)
    // },
    models: models,
    queues: queues,
    requestId: ctx.request.requestId,
    userId: ctx.session.userId
  }
  return {
    rootValue,
    schema
  }
}

app.use(router.middleware())

// Serve everything in assets folder, falling back to index.html
// This will catch any request that's not handled by the router
app.use(assets(config.ASSETS_PATH))

app.init = function init (port = Number(process.env.PORT) || 3000) {
  return new Promise(resolve => {
    const instance = app.listen(port, () => {
      log(`listening on port "${port}"`)
      resolve(instance)
    })
  })
}

export default app

// Initialize server if called directly
if (require.main === module) {
  log('auto-initializing')
  app.init()
}
