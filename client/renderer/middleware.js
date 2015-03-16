var path = require('path'),
  request = require('../utils/request.server.js'),
  log = require('debug')('bshed:client:middleware')

module.exports = function ({assetPath}={}) {
  log(`Loading renderer from ${path.join(assetPath, 'renderer')}`)
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
    console.warn(`UNABLE TO LOAD ${path.join(assetPath, 'assets/stats.json')}`)
    stats = {assetsByChunkName: {bshed: ''}, publicPath: ''}
  }

  if (typeof stats.assetsByChunkName.bshed === 'string')
    stats.assetsByChunkName.bshed = [stats.assetsByChunkName.bshed]

  stats.assetsByChunkName.bshed.forEach(asset => {
    if (asset.indexOf('bshed') !== 0) return
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
