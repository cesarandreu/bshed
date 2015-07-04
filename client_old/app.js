require('./components/styles/imports.less')
require('./components/styles/base.less')

const RequestPlugin = require('./lib/RequestPlugin')
const RouterPlugin = require('./lib/RouterPlugin')
const Fluxible = require('fluxible')

const app = new Fluxible({
  component: require('./routes')
})

app.plug(RouterPlugin())

app.plug(RequestPlugin())

const stores = [
  require('./stores/ApplicationStore'),
  require('./stores/BikeshedBuilderStore'),
  require('./stores/BikeshedRateStore'),
  require('./stores/BikeshedStore'),
  require('./stores/NavbarStore'),
  require('./stores/SidebarStore')
]
stores.forEach(store => app.registerStore(store))

module.exports = app
