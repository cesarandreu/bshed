'use strict';

var supertest = require('supertest'),
  methods = require('methods');

var promises = require('./request.promisify');
module.exports = function serverRequest (server, headers) {
  var request = supertest(server), out = {};
  ['dev'].concat(methods).forEach((method) => {
    if (request[method]) {
      out[method] = (...args) => {
        return request[method].apply(request, args).set(headers).use(promises);
      }
    }
  });
  return out;
};
