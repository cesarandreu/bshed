/**
 * User for generating client production builds
 */
module.exports = require('./webpack.make')({
  SERVER: false,
  BUILD: true,
  TEST: false
})
