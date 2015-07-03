import server from '../../server'
import renderer from './renderer'
const assets = getAssets()

server.use(renderer(assets))
export default server.init()

function getAssets () {
  const {publicPath, assets} = getStats()
  return assets
    .filter(asset =>
      asset.chunkNames.filter(name => !asset.name.indexOf(name)).length
    )
    .reduce((assets, { name }) => {
      if (/\.js$/.test(name)) {
        assets.scripts.push(`${publicPath}${name}`)
      } else if (/\.css$/.test(name)) {
        assets.styles.push(`${publicPath}${name}`)
      }
      return assets
    }, {
      scripts: [],
      styles: []
    })
}

// Load ./stats.json because we know it gets output to the build folder
// If there's no stats.json then we use a fake object with the expected keys
function getStats () {
  try {
    return require('./stats.json')
  } catch (err) {
    return {
      publicPath: '/assets/',
      assets: []
    }
  }
}

// const server = require('../../server')
// const clientRenderer = require('./middleware')
// // const log = require('debug')('bshed:client:server')

// server.use(clientRenderer({
//   assets: getAssets()
// }))
// server.init()

// function getAssets () {
//   const {assetsByChunkName, publicPath} = getStats()

//   return Object.keys(assetsByChunkName)
//     .reduce((assets, name) => {
//       const assetList = typeof assetsByChunkName[name] === 'string'
//         ? [assetsByChunkName[name]]
//         : assetsByChunkName[name]

//       return assetList
//         .filter(asset => !asset.indexOf(name))
//         .map(asset => `${publicPath}${asset}`)
//         .reduce((assets, asset) => {
//           switch (asset.split('.').pop()) {
//             case 'js':
//               assets.scripts.push(asset)
//               break
//             case 'css':
//               assets.styles.push(asset)
//               break
//           }
//           return assets
//         }, assets)
//     }, {
//       scripts: [],
//       styles: []
//     })
// }

// function getStats () {
//   try {
//     return require('./stats.json')
//   } catch (err) {
//     return {
//       publicPath: '/assets/',
//       assetsByChunkName: {
//         bshed: ''
//       }
//     }
//   }
// }
