'use strict';

/**
 * MODULES
 */
var debug = require('debug'),
  config = require('../config'),
  models = require('./models'),
  controllers = require('./controllers'),
  helpers = require('./helpers')(config);

/**
 * KOA MODULES
 */
var koa = require('koa'),
  logger = require('koa-logger'),
  responseTime = require('koa-response-time'),
  compress = require('koa-compress'),
  mount = require('koa-mount');

var log = debug('app:log');
var app = koa();
app.name = config.name;
app.env = config.env;
app.config = config;
app.models = app.context.models = models;
app.helpers = app.context.helpers = helpers;

/**
 * GLOBAL MIDDLEWARE
 */
if (app.env !== 'test') {
  log('logging enabled');
  app.use(logger()); // logging
}
app.use(responseTime()); // x-response-time
app.use(compress(config.middleware.compress)); // compression

/**
 * API MIDDLEWARE
 *
 * Mounts all controller endpoints in /api
 * Pass helpers to all controllers
 */
app.use(mount('/api', controllers.middleware(helpers)));

/**
 * INITIALIZER
 *
 * Listens for connections
 * Returns Server
 */
app.init = function init () {
  log('initializing application');
  app.server = app.listen(config.port, function () {
    log('Server running on port %d', config.port);
  });
  return app.server;
};

// auto start if the app is not being initialized by another module
if (!module.parent) {
  log('No module parent, calling start');
  app.init();
}

// exports the app so it can be started externally
// if you require the app you're responsible for calling start or init
module.exports = app;
