// Styles
import './components/styles/base.less'

// Modules
import Fluxible from 'fluxible'

// Plugins
import RequestPlugin from './lib/RequestPlugin'

// Component
import Application from './components/Application'

// Stores
import ApplicationStore from './stores/ApplicationStore'
import RouteStore from './stores/RouteStore'
import SidebarStore from './stores/SidebarStore'

// Initialize application
const app = new Fluxible({
  component: Application,
  stores: [
    ApplicationStore,
    RouteStore,
    SidebarStore
  ]
})

app.plug(RequestPlugin())

export default app
