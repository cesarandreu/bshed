require('babel/register')({
  ignore: /node_modules|public/
})

// modules
var koa = require('koa')
var qs = require('koa-qs')
var csrf = require('koa-csrf')
var mount = require('koa-mount')
var serve = require('koa-static')
var session = require('koa-session')
var compress = require('koa-compress')
var debug = require('debug')('bshed:server')
var responseTime = require('koa-response-time')

// application modules
debug('loading modules')
var config = require('./config')
var models = require('./models')
var s3 = require('./lib/s3')
var api = require('./api')
var client = require('./client/renderer/middleware')

// initialization
debug('initializing modules')
s3 = s3(config.aws)
models = models({
  config: config.database
})
api = api({
  config: config.api,
  models: models,
  s3: s3
})
client = client({
  assetPath: config.server.assets
})

/**
 * SERVER
 */
var server = qs(koa())
server.name = config.server.name
server.env = config.server.env
server.keys = config.secret
server.config = config
server.models = models
server.api = api

/**
 * MIDDLEWARE
 */
if (server.env === 'development')
  server.use(require('koa-logger')()) // request logging
server.use(responseTime()) // x-response-time
server.use(compress()) // compression
server.use(serve(config.server.assets, config.server.middleware.serve)) // assets
server.use(session(config.server.middleware.session, server)) // sessions
server.use(csrf()) // csrf

// set csrf cookie token
server.use(function* setCsrfCookie (next) {
  this.cookies.set('XSRF-TOKEN', this.csrf)
  yield next
})

/**
 * APPLICATIONS
 */
debug('mounting modules')
server.use(mount(api))
server.use(mount(client))

/**
 * SERVER INITIALIZER
 *
 * Listen for connections
 * returns server instance
 */
server.init = function init (port=config.server.port) {
  debug('initializing server using port %d', port)
  server.server = server.listen(port, () => debug('listening on port %d', port))
  return server.server
}

// export the server so it can be started externally
module.exports = server

// initialize server if called directly
if (require.main === module)
  server.init()
