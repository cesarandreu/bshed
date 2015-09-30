/**
 * Used for generating client development builds
 */
module.exports = require('./webpack-config-maker')({
  BUILD: false,
  TEST: false
})
