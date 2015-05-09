var assert = require('assert')

var config = {
  development: {
    port: 3000,
    keys: ['secret']
  },
  test: {
    port: 4000,
    keys: ['secret']
  },
  production: {
    port: process.env.PORT || 3000,
    keys: (process.env.SECRET || '').split(',')
  }
}

module.exports = function serverConfig (env) {
  assert(env && config[env], `server config env ${env} is invalid`)
  return config[env]
}
