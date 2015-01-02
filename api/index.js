'use strict';

var debug = require('debug')('bshed:api'),
  session = require('koa-session'),
  compose = require('koa-compose'),
  mount = require('koa-mount'),
  csrf = require('koa-csrf'),
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
  assert(opts.config);
  assert(opts.models);
  debug('loader:start');

  var api = koa();
  api.name = opts.config.name;
  api.env = opts.config.env;
  api.keys = opts.config.secret;
  api.config = opts.config;
  api.models = opts.models;
  api.controllers = controllers;
  api.helpers = helpers;

  var middleware = compose([
    session(api.config.middleware.session, api),
    csrf(),
    setCsrfCookie(),
    addToContext({models: api.models}),
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
    yield next;
  };
}

function setCsrfCookie () {
  return function* setCsrfCookieMiddleware (next) {
    this.cookies.set('XSRF-TOKEN', this.csrf);
    yield next;
  };
}

