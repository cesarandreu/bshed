'use strict';

global.expect = require('chai').expect;

var path = require('path'),
  base = path.resolve(__dirname, '..'),
  fixtures = path.join(base, '/test/fixtures'),
  config = require(path.join(base, 'config')),
  models = require(path.join(base, 'models')),
  api =  require(path.join(base, 'api')),
  buildHeaders = require('./buildHeaders');

// initialize stuff
buildHeaders = buildHeaders({
  key: config.server.middleware.session.key,
  secret: config.secret
});
models = models({
  database: config.database
});
api = api({
  config: config.api,
  models: models
});

module.exports = {
  api: api,
  base: base,
  config: config,
  models: models,
  fixtures: fixtures,
  buildHeaders: buildHeaders
};
