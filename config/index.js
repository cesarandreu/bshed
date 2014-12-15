'use strict';

var path = require('path'),
  _ = require('lodash');

/**
 * GLOBAL CONFIGURATION
 */
var config = {
  name: 'bshed',
  env: (process.env.NODE_ENV || 'development').toLowerCase(),

  middleware: {
    // koa-compress
    compress: {},

    // koa-send
    send: {
      root: path.resolve(__dirname, '../public')
    }
  }
};

/**
 * ENVIRONMENTS
 */
var environments = {};

// development
environments.development = {
  port: 3000,
  secret: 'secret',
};

// test
environments.test = {
  port: 4000,
  secret: 'secret'
};

// production
environments.production = {
  port: process.env.PORT || 3000,
  secret: 'secret'
};

// Database config
config.database = require('./database')[config.env];

// AWS config
config.aws = require('./aws')[config.env];

module.exports = _.merge(config, environments[config.env]);
