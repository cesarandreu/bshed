var assert = require('assert'),
  request = require('./utils/request.server.js'),
  log = require('debug')('bshed:client:middleware');

module.exports = function (opts={}) {
  assert(opts.rendererPath);
  assert(opts.assets);

  var {rendererPath} = opts,
    assets = opts.assets();
  return function* client () {
    var {url, csrf} = this;
    try {
      log(`using renderer from ${rendererPath}`);
      var renderer = require(rendererPath);
      var {body, type, status} = yield renderer({
        url, assets,
        request: request(this.app.server, {
          'cookie': this.get('cookie'), // send cookie header
          'x-csrf-token': csrf // send csrf header
        }),
      });
      Object.assign(this, {status, body, type})
    } catch (err) {
      console.error(err);
      this.throw(500);
    }
  };

};
