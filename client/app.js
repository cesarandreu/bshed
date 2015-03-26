var RouterPlugin = require('./utils/plugins/router'),
  ActionPlugin = require('./utils/plugins/action'),
  FetchPlugin = require('./utils/plugins/fetch'),
  fetch = require('isomorphic-fetch'),
  Fluxible = require('fluxible')

var app = new Fluxible({
  component: require('./app/Routes.jsx')
})

app.plug(RouterPlugin({
  location: require('react-router').HistoryLocation
}))

app.plug(FetchPlugin({
  fetch: typeof fetch === 'function' ? fetch : global.fetch
}))

app.plug(ActionPlugin())

app.registerStore(require('./stores/ApplicationStore.js'))
app.registerStore(require('./stores/BikeshedListStore.js'))
app.registerStore(require('./stores/BikeshedBuilderStore.js'))
app.registerStore(require('./stores/LayoutStore.js'))
app.registerStore(require('./stores/RequestStore.js'))

module.exports = app
