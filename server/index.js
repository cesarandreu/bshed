#!/usr/bin/env node -r bshed-requires
import Koa from 'koa'
import debug from 'debug'
import convert from 'koa-convert'
import session from 'koa-session'
// import DataLoader from 'dataloader'
const log = debug('server:loader')

// Server libraries
import assets from './middleware/assets'
import graphiql from './middleware/graphiql'
import graphqlHTTP from './middleware/graphql'
import imageProxy from './middleware/imageProxy'
import requestId from './middleware/requestId'
import Router from './middleware/router'
// import setCsrfToken from './middleware/setCsrfToken'
import setUser from './middleware/setUser'
import uploader from './lib/uploader'

// Config, models, schema, queues
import * as config from '../config'
import models from './models'
import queues from './services/queues'
import s3fs from './services/s3fs'
import schema from './schema'

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
  const { exposeError } = require('./middleware/exposeError')
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
  middleware: imageProxy(s3fs)
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
