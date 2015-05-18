// modules
var koa = require('koa')
var qs = require('koa-qs')
var csrf = require('koa-csrf')
var session = require('koa-session')
var compress = require('koa-compress')
var debug = require('debug')('bshed:server')
var middleware = require('./utils/middleware')
var responseTime = require('koa-response-time')

// libs and modules
debug('loading libs and modules')
var modelLoader = require('./models')
var s3Loader = require('./lib/s3')
var apiLoader = require('./api')

// configuration
debug('loading and generating config')
var configGenerator = require('./config')
var config = configGenerator()

// initialization
debug('initializing libs and modules')
var s3 = s3Loader(config.aws)
var models = modelLoader(config.database)
var api = apiLoader({
  config,
  models,
  s3
})

/**
 * SERVER
 * Exported so it can be started externally
 */
var server = module.exports = qs(koa())
Object.assign(server, {
  name: config.name,
  keys: config.keys,
  env: config.env,
  config,
  models,
  api,
  s3
})

/**
 * MIDDLEWARE
 */

// request logging
if (server.env === 'development')
  server.use(require('koa-logger')())

// x-response-time
server.use(responseTime())

// compression
server.use(compress())

// cookie sessions
server.use(session(config.middleware.session, server))

// csrf token
server.use(csrf())

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
 *
 * Listen for connections
 * returns server instance
 */
server.init = function init (port=config.port) {
  debug(`initializing server using port ${port}`)
  server.server = server.listen(port, () => debug(`listening on port ${port}`))
  return server.server
}

// initialize server if called directly
if (require.main === module)
  server.init()
