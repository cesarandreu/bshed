'use strict'

var config = require('../../config'),
  models = require('../')

module.exports = {
  models: models({config: config.database})
}
