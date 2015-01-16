'use strict';

// modules
var koa = require('koa'),
  path = require('path'),
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

// asset link loader
var assets = function assets () {
  var buckets = {'.js': 'scripts', '.css': 'styles'},
    _assets = {scripts: [], styles: []}, stats;

  try {
    stats = require(path.join(config.server.assets, 'assets/stats.json'));
  } catch (err) {
    console.warn('UNABLE TO LOAD stats.json');
    stats = {assets: [], publicPath: ''};
  }

  stats.assets.forEach(function (asset) {
    var extname = path.extname(asset.name), bucket = buckets[extname];
    if (bucket) _assets[bucket].push(`${stats.publicPath}${asset.name}`);
  });
  return _assets;
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
  assets: assets
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
