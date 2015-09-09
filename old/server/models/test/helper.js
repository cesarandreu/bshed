const buildFactories = require('../../test/factories')
const configLoader = require('../../config')
const modelLoader = require('../index.js')
const s3Loader = require('../../lib/s3')

const config = configLoader()
const s3 = s3Loader(config.aws)
const models = modelLoader(config.database)
const factories = buildFactories(models, s3)

module.exports = {
  factories,
  models
}
