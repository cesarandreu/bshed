const server = require('../../server')
const clientRenderer = require('./middleware')
// const log = require('debug')('bshed:client:server')

server.use(clientRenderer({
  assets: getAssets()
}))
server.init()

function getAssets () {
  const {assetsByChunkName, publicPath} = getStats()

  return Object.keys(assetsByChunkName)
    .reduce((assets, name) => {
      const assetList = typeof assetsByChunkName[name] === 'string'
        ? [assetsByChunkName[name]]
        : assetsByChunkName[name]

      return assetList
        .filter(asset => !asset.indexOf(name))
        .map(asset => `${publicPath}${asset}`)
        .reduce((assets, asset) => {
          switch (asset.split('.').pop()) {
            case 'js':
              assets.scripts.push(asset)
              break
            case 'css':
              assets.styles.push(asset)
              break
          }
          return assets
        }, assets)
    }, {
      scripts: [],
      styles: []
    })
}

function getStats () {
  try {
    return require('./stats.json')
  } catch (err) {
    return {
      publicPath: '/assets/',
      assetsByChunkName: {
        bshed: ''
      }
    }
  }
}
