const path = require('path')
const server = require('../../server')
const utils = require('../../test/utils')
const supertest = require('supertest-as-promised')
const buildFactories = require('../../test/factories')

const buildUserHeaders = utils.buildUserHeaders({
  key: server.config.middleware.session.key,
  secrets: server.config.keys
})

module.exports = {
  server: server,
  models: server.models,
  config: server.config,
  buildUserHeaders: buildUserHeaders,
  request: supertest(server.callback()),
  factories: buildFactories(server.models, server.s3),
  fixtures: path.resolve(__dirname, '../../test/fixtures')
}
