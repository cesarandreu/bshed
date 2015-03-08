'use strict'

var path = require('path'),
  base = path.resolve(__dirname, '..'),
  fixtures = path.join(base, 'test/fixtures'),
  config = require(path.join(base, 'config')),
  models = require(path.join(base, 'models')),
  server = require(path.join(base, 'server')),
  buildHeaders = require('./buildHeaders'),
  {expect} = require('chai')

// initialize stuff
buildHeaders = buildHeaders({
  key: config.server.middleware.session.key,
  secret: config.secret
})
models = models({
  database: config.database
})

module.exports = {
  base,
  expect,
  config,
  models,
  server,
  fixtures,
  buildHeaders
}
