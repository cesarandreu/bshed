'use strict';

// REFERENCES
// https://github.com/pillarjs/cookies/blob/master/lib/cookies.js
// https://github.com/koajs/session/blob/master/index.js
// https://github.com/koajs/csrf/blob/master/index.js
var Cookie = require('cookies').Cookie,
  Keygrip = require('keygrip'),
  assert = require('assert'),
  csrf = require('csrf'),
  _ = require('lodash');

// secret - array of secrets for Keygrip
// key - session cookie name
module.exports = function buildHeadersHelper (opts) {
  assert(opts);
  assert(opts.secret);
  assert(opts.key);

  var maxAge = 24 * 60 * 60 * 1000,
    keys = new Keygrip(opts.secret),
    tokens = csrf();

  return function buildHeaders (session) {
    // _expire and _maxAge are used by koa-session
    session = _.assign({
      _expire: maxAge + Date.now(),
      _maxAge: maxAge,
      secret: tokens.secretSync()
    }, session);

    var value = (new Buffer(JSON.stringify(session))).toString('base64'),
      cookie = new Cookie(opts.key, value, {maxAge: maxAge}),
      headers = {
        'x-csrf-token': tokens.create(session.secret),
        'cookie': cookie.toHeader() + ';'
      };

    // signed cookie
    cookie.value = keys.sign(cookie.toString());
    cookie.name += '.sig';
    headers.cookie += cookie.toHeader() + ';';

    return headers;
  };

};
