'use strict';

var debug = require('debug')('bshed:api'),
  compose = require('koa-compose'),
  mount = require('koa-mount'),
  assert = require('assert'),
  koa = require('koa');

var controllers = require('./controllers'),
  helpers = require('./helpers');

/**
 * API loader
 *
 * requires opts.config, opts.models
 * returns api application
 */
module.exports = function apiLoader (opts) {
  assert(opts);
  assert(opts.s3);
  assert(opts.config);
  assert(opts.models);
  debug('loader:start');

  var api = koa();
  api.name = opts.config.name;
  api.env = opts.config.env;
  api.keys = opts.config.secret;
  api.config = opts.config;
  api.models = opts.models;
  api.s3 = opts.s3;
  api.controllers = controllers;
  api.helpers = helpers;

  var middleware = compose([
    addToContext({models: api.models, s3: api.s3, helpers: api.helpers}),
    controllers(helpers)
  ]);

  api.use(mount(api.config.endpoint, middleware));
  debug('loader:end');
  return api;
};

// middleware~
function addToContext (opts) {
  return function* addToContextMiddleware (next) {
    this.models = opts.models;
    this.s3 = opts.s3;
    this.helpers = opts.helpers;
    yield next;
  };
}
