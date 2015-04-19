var RouterPlugin = require('./utils/plugins/RouterPlugin')
var FetchPlugin = require('./utils/plugins/FetchPlugin')
var fetch = require('isomorphic-fetch')
var Fluxible = require('fluxible')

var app = new Fluxible({
  component: require('./app/routes')
})

app.plug(RouterPlugin({
  location: require('react-router').HistoryLocation
}))

app.plug(FetchPlugin({
  fetch: typeof fetch === 'function' ? fetch : global.fetch
}))

// Application
app.registerStore(require('./app/Application/stores/ApplicationStore'))
app.registerStore(require('./app/Application/stores/LayoutStore'))
app.registerStore(require('./app/Application/stores/RequestStore'))

// Bikesheds
app.registerStore(require('./app/Bikesheds/stores/BikeshedListStore'))

// Home
app.registerStore(require('./app/Home/stores/BikeshedBuilderStore'))

module.exports = app
