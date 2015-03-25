var RouterPlugin = require('./plugins/router'),
  RequestPlugin = require('./plugins/request'),
  ActionPlugin = require('./plugins/action'),
  Fluxible = require('fluxible')

var app = new Fluxible({
  component: require('./app/Routes.jsx')
})

app.plug(RouterPlugin({
  location: require('react-router').HistoryLocation
}))

app.plug(RequestPlugin({
  fetch: require('isomorphic-fetch')
}))

app.plug(ActionPlugin())

app.registerStore(require('./stores/ApplicationStore.js'))
app.registerStore(require('./stores/BikeshedListStore.js'))
app.registerStore(require('./stores/BikeshedBuilderStore.js'))
app.registerStore(require('./stores/LayoutStore.js'))
app.registerStore(require('./stores/RequestStore.js'))

module.exports = app
