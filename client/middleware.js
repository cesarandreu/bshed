'use strict';

var assert = require('assert'),
  request = require('supertest'),
  log = require('debug')('bshed:client:middleware');

module.exports = function (opts={}) {
  assert(opts.rendererPath);
  assert(opts.assets);

  var {rendererPath} = opts,
    assets = opts.assets();

  return function* client () {
    var {url, path, method} = this;
    try {
      log(`using renderer from ${rendererPath}`);
      var renderer = require(rendererPath);
      var {body, type} = yield renderer({
        url, path, method, assets,
        request: request(this.app.callback())
      });
      this.body = body;
      this.type = type;
    } catch (err) {
      if (err && err.status) this.throw(err.status);
      else this.throw(500);
    }
  };

};
