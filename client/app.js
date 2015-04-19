var RouterPlugin = require('./utils/plugins/router'),
  FetchPlugin = require('./utils/plugins/fetch'),
  fetch = require('isomorphic-fetch'),
  Fluxible = require('fluxible')

var app = new Fluxible({
  component: require('./app/routes.jsx')
})

app.plug(RouterPlugin({
  location: require('react-router').HistoryLocation
}))

app.plug(FetchPlugin({
  fetch: typeof fetch === 'function' ? fetch : global.fetch
}))

// Application
app.registerStore(require('./app/application/stores/ApplicationStore'))
app.registerStore(require('./app/application/stores/LayoutStore'))
app.registerStore(require('./app/application/stores/RequestStore'))

// Bikesheds
app.registerStore(require('./app/bikesheds/stores/BikeshedListStore'))

// Home
app.registerStore(require('./app/home/stores/BikeshedBuilderStore'))

module.exports = app
