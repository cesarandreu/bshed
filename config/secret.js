var assert = require('assert')

var secret = {
  development: ['secret'],
  test: ['secret'],
  production: (process.env.SECRET || '').split(',')
}

module.exports = function (env) {
  assert(secret[env] && secret[env].length)
  return secret[env]
}
