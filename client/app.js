require('./styles/imports.less')
require('./styles/base.less')

const RequestPlugin = require('./lib/RequestPlugin')
const RouterPlugin = require('./lib/RouterPlugin')
const Fluxible = require('fluxible')

const app = new Fluxible({
  component: require('./routes')
})

app.plug(RouterPlugin({
  location: require('react-router').HistoryLocation
}))

app.plug(RequestPlugin({
  fetch: require('isomorphic-fetch'),
  host: 'localhost:3000',
  protocol: 'http:'
}))

const stores = [
  require('./stores/ApplicationStore'),
  require('./stores/BikeshedBuilderStore'),
  require('./stores/BikeshedListStore'),
  require('./stores/LayoutStore')
]
stores.forEach(store => app.registerStore(store))

module.exports = app
