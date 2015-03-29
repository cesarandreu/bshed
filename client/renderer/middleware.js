var path = require('path'),
  renderer = require('./renderer'),
  log = require('debug')('bshed:client:middleware')

module.exports = function ({assetPath}={}) {
  var assets = assetList(assetPath)

  return function* client () {
    try {
      var {body, type, status} = yield renderer({
        assets: assets, url: this.url, host: this.host, protocol: this.protocol,
        csrf: this.csrf, cookie: this.get('cookie')
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

  stats.assetsByChunkName.bshed
  .filter(asset => !asset.indexOf('bshed'))
  .forEach(asset => {
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
