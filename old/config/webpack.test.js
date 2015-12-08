/**
 * Used for generating client test builds
 */
module.exports = require('./webpack-config-maker')({
  BUILD: false,
  TEST: true
})
