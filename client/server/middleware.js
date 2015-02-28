var assert = require('assert'),
  request = require('../utils/request.server.js'),
  log = require('debug')('bshed:client:middleware')

module.exports = function ({rendererPath, assets}={}) {
  assert(rendererPath && assets)
  assets = assets()
  return function* client () {
    try {
      log(`using renderer from ${rendererPath}`)
      var renderer = require(rendererPath)
      var {body, type, status} = yield renderer({
        assets: assets, url: this.url,
        request: request(this.app.server, {
          'cookie': this.get('cookie'), // send cookie header
          'x-csrf-token': this.csrf // send csrf header
        })
      })
      Object.assign(this, {status, body, type})
    } catch (err) {
      console.error(err)
      this.throw(500)
    }
  }

}
