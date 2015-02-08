'use strict';

var superagent = require('superagent'),
  cookies = require('cookies-js'),
  methods = require('methods');

var promises = require('./request.promisify');
module.exports = (function clientRequest () {
  var out = {};
  ['del'].concat(methods).forEach((method) => {
    if (superagent[method]) {
      out[method] = (...args) => {
        return superagent[method].apply(superagent, args).use(xsrfToken).use(promises);
      }
    }
  })
  return out;
})();

function xsrfToken (request) {
  return request.set('x-xsrf-token', cookies.get('XSRF-TOKEN'));
}
