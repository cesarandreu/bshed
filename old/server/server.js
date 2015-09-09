// modules
const koa = require('koa')
const qs = require('koa-qs')
const csrf = require('koa-csrf')
const serve = require('koa-static')
const session = require('koa-session')
// const compress = require('koa-compress')
const createError = require('http-errors')
const debug = require('debug')('bshed:server')
const middleware = require('./utils/middleware')
const responseTime = require('koa-response-time')

// libs and modules
debug('loading libs and modules')
const modelLoader = require('./models')
const s3Loader = require('./lib/s3')
const apiLoader = require('./api')

// configuration
debug('loading and generating config')
const configGenerator = require('./config')
const config = configGenerator()

// initialization
debug('initializing libs and modules')
const s3 = s3Loader(config.aws)
const models = modelLoader(config.database)
const api = apiLoader({
  models,
  s3
})

/**
 * SERVER
 */
const server = qs(koa())
Object.assign(server, {
  name: config.name,
  keys: config.keys,
  env: config.env,
  config,
  models,
  api,
  s3
})

// Error handler
server.on('error', function serverError (err, ctx) {
  const isKnownError = [
    'ValidationError'
  ].some(name => err.name === name)
  if (isKnownError) return

  const isHttpError = Object.keys(createError).some(name => err instanceof createError[name])
  if (isHttpError) return

  console.error(`\n ${(err.stack || err.toString()).replace(/^/gm, ' ')} \n`)
})

/**
 * MIDDLEWARE
 */

// request logging
if (server.env === 'development') {
  server.use(require('koa-logger')())
}

// x-response-time
server.use(responseTime())

// compression
// server.use(compress())

// file server
server.use(serve('./public'))

// cookie sessions
server.use(session(config.middleware.session, server))

// csrf token
server.use(csrf())

// Set user
server.use(middleware.setUser())

// Expose errors
server.use(middleware.exposeError())

// XSRF-TOKEN
server.use(middleware.setCsrfToken())

// logged_in cookie
server.use(middleware.setLoggedInCookie())

/**
 * APPLICATION
 */
debug('mounting modules')
server.use(api)

/**
 * SERVER INITIALIZER
 * Listen for connections
 * returns server instance
 */
server.init = function init (port=config.port) {
  debug(`initializing server using port ${port}`)
  server.server = server.listen(port, () => debug(`listening on port ${port}`))
  return server.server
}

// Export server so it can be started externally
module.exports = server

// initialize server if called directly
if (require.main === module) {
  server.init()
}
