'use strict';

// modules
var koa = require('koa'),
  mount = require('koa-mount'),
  serve = require('koa-static'),
  compress = require('koa-compress'),
  debug = require('debug')('bshed:server'),
  responseTime = require('koa-response-time');

// application modules
debug('loading modules');
var config = require('./config'),
  models = require('./models'),
  api = require('./api');

// initialization
debug('initializing modules');
models = models({
  database: config.database
});
api = api({
  config: config.api,
  models: models
});

/**
 * SERVER
 */
var server = koa();
server.name = config.server.name;
server.env = config.server.env;
server.keys = config.secret;
server.config = config;
server.models = models;
server.api = api;

/**
 * MIDDLEWARE
 */
if (server.env === 'development') {
  server.use(require('koa-logger')()); // request logging
}
server.use(responseTime()); // x-response-time
server.use(compress()); // compression
server.use(serve(config.server.assets, config.server.middleware.serve)); // assets

/**
 * APPLICATIONS
 */
debug('mounting modules');
server.use(mount(api));

/**
 * SERVER INITIALIZER
 *
 * Listen for connections
 * returns server instance
 */
server.init = function init (port) {
  port = port || config.server.port;
  debug('initializing server using port %d', port);
  server.server = server.listen(port, function () {
    debug('listening on port %d', port);
  });
  return server.server;
};

// export the server so it can be started externally
module.exports = server;

// initialize server if there's no parent
if (!module.parent) {
  server.init();
}
