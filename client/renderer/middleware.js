var path = require('path'),
  request = require('../utils/request.server.js'),
  log = require('debug')('bshed:client:middleware')

module.exports = function ({assetPath}={}) {
  var renderer = require(path.join(assetPath, 'renderer')),
    assets = assetList(assetPath)

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
  var assets = {scripts: [], styles: []}, stats

  try {
    log(`Getting asset list from ${assetPath}`)
    stats = require(path.join(assetPath, 'assets/stats.json'))
  } catch (err) {
    console.warn(`UNABLE TO LOAD ${path.join(assetPath, 'assets/stats.json')}`, err)
    stats = {assetsByChunkName: {bshed: []}, publicPath: ''}
  }

  stats.assetsByChunkName.bshed.forEach(asset => {
    switch (path.extname(asset)) {
      case '.js':
        assets.scripts.push(`${stats.publicPath}${asset}`)
        break
      case '.css':
        assets.styles.push(`${stats.publicPath}${asset}`)
        break
    }
  })

  log(`Asset list: ${JSON.stringify(assets)}`)
  return assets
}
