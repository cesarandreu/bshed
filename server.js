'use strict';

// modules
var fs = require('fs'),
  koa = require('koa'),
  csrf = require('koa-csrf'),
  mount = require('koa-mount'),
  serve = require('koa-static'),
  session = require('koa-session'),
  compress = require('koa-compress'),
  debug = require('debug')('bshed:server'),
  responseTime = require('koa-response-time');

// application modules
debug('loading modules');
var config = require('./config'),
  models = require('./models'),
  s3 = require('./lib/s3'),
  api = require('./api'),
  client = require('./client/middleware');

// assets
var getScripts = function () {
  return fs.readdirSync(`${config.server.assets}/assets/`)
    .filter(file => file.indexOf('scripts.') !== -1)
    .map(file => [file, fs.statSync(`${config.server.assets}/assets/${file}`)])
    .map(pair => [`/assets/${pair[0]}`, pair[1]])
    .sort((a, b) => b[1].ctime.getTime() - a[1].ctime.getTime())
    .shift().shift();
};

var assets = function () {
  return {
    scripts: getScripts()
  };
};

var getAssets = function (env) {
  if (env === 'production') {
    var result = assets();
    return () => result;
  } else {
    return assets;
  }
};

// initialization
debug('initializing modules');
s3 = s3(config.aws);
models = models({
  database: config.database
});
api = api({
  config: config.api,
  models: models,
  s3: s3
});
client = client({
  getAssets: getAssets(config.server.env)
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
server.use(session(config.server.middleware.session, server)); // sessions
server.use(csrf()); // csrf

// set csrf cookie token
server.use(function* setCsrfCookie (next) {
  this.cookies.set('XSRF-TOKEN', this.csrf);
  yield next;
});

/**
 * APPLICATIONS
 */
debug('mounting modules');
server.use(mount(api));
server.use(mount(client));

// if (server.env === 'production') {
//   var scripts = fs.readdirSync(`${config.server.assets}/assets/`)
//     .filter(file => file.indexOf('scripts.') !== -1)
//     .map(file => [file, fs.statSync(`${config.server.assets}/assets/${file}`)])
//     .map(pair => [`/assets/${pair[0]}`, pair[1]])
//     .sort((a, b) => b[1].ctime.getTime() - a[1].ctime.getTime())
//     .shift().shift();


// } else {
//   // else body
// }

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
