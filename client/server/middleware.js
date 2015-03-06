var path = require('path'),
  renderer = require('./renderer'),
  request = require('../utils/request.server.js'),
  log = require('debug')('bshed:client:middleware')

module.exports = function ({assetPath}={}) {
  var assets = assetList(assetPath)
  return function* client () {
    try {
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

// asset link loader
function assetList (assetPath) {
  var buckets = {'.js': 'scripts', '.css': 'styles'},
    assets = {scripts: [], styles: []}, stats

  try {
    log(`Getting asset list from ${assetPath}`)
    stats = require(path.join(assetPath, 'assets/stats.json'))
  } catch (err) {
    console.warn(`UNABLE TO LOAD ${path.join(assetPath, 'assets/stats.json')}`, err)
    stats = {assets: [], publicPath: ''}
  }

  stats.assets.forEach(function (asset) {
    var bucket = buckets[path.extname(asset.name)]
    if (bucket && (bucket !== 'scripts' || !asset.name.indexOf('scripts')))
      assets[bucket].push(`${stats.publicPath}${asset.name}`)
  })

  return assets
}
