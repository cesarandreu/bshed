// REFERENCES
// https://github.com/pillarjs/cookies/blob/master/lib/cookies.js
// https://github.com/koajs/session/blob/master/index.js
// https://github.com/koajs/csrf/blob/master/index.js
var Cookie = require('cookies').Cookie
var Keygrip = require('keygrip')
var assert = require('assert')
var csrf = require('csrf')
var _ = require('lodash')

// key - session cookie name
// secrets - array of secrets for Keygrip
module.exports = function buildHeadersHelper ({secrets, key}={}) {
  assert(secrets && key, 'secrets and key are needed')

  var maxAge = 24 * 60 * 60 * 1000
  var keys = new Keygrip(secrets)
  var tokens = csrf()

  return function buildHeaders (session) {
    // _expire and _maxAge are used by koa-session
    session = _.assign({
      _expire: maxAge + Date.now(),
      _maxAge: maxAge,
      secret: tokens.secretSync()
    }, _.cloneDeep(session))

    var value = (new Buffer(JSON.stringify(session))).toString('base64')
    var cookie = new Cookie(key, value, {maxAge})
    var headers = {
      'x-csrf-token': tokens.create(session.secret),
      'cookie': `${cookie.toHeader()};`
    }

    // signed cookie
    cookie.value = keys.sign(cookie.toString())
    cookie.name += '.sig'
    headers.cookie += `${cookie.toHeader()};`

    return headers
  }

}
