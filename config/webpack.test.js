/**
 * Used for generating client test builds
 */
module.exports = require('./webpack.make')({
  SERVER: false,
  BUILD: false,
  TEST: true
})
