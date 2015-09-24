/**
 * Used for generating client development builds
 */
module.exports = require('./webpack.make')({
  SERVER: false,
  BUILD: false,
  TEST: false
})
