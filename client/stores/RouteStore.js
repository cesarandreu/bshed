import { RouteStore } from 'fluxible-router'
import routes from '../components/routes'

const routeStore = RouteStore.withStaticRoutes(routes)

export default routeStore
