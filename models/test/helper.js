var configLoader = require('../../config')
var modelLoader = require('../index.js')

var config = configLoader()
var models = modelLoader({
  config: config.database
})

module.exports = {
  models
}
