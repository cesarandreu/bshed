'use strict';

var methods = require('methods'),
  Test = require('supertest').Test;

module.exports = function request (server, headers) {

  // from supertest
  function requestWrapper (method, path) {
    return new Test(server, method, path).set(headers);
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
};
