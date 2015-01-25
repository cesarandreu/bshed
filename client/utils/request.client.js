'use strict';

var superagent = require('superagent'),
  cookies = require('cookies-js'),
  methods = require('methods');

module.exports = (function request () {
  function requestWrapper () {
    return superagent.apply(null, arguments)
      .set('x-xsrf-token', cookies.get('XSRF-TOKEN'));
  }

  // from superagent
  methods.forEach(function (method) {
    var name = 'delete' === method ? 'del' : method;
    method = method.toUpperCase();
    requestWrapper[name] = function (url, fn) {
      var req = requestWrapper(method, url);
      if (fn) req.end(fn);
      return req;
    };
  });

  return requestWrapper;
})();
