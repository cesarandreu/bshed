/**
 * Used for generating client production builds
 */
module.exports = require('./webpack-config-maker')({
  BUILD: true,
  TEST: false
})
