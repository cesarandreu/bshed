import Layout from './components/Layout'

import { routes as BikeshedBuilderRoutes } from './pages/BikeshedBuilder'
import { routes as AboutRoutes } from './pages/About'
import { routes as HomeRoutes } from './pages/Home'

export const routes = {
  component: Layout,
  childRoutes: [
    BikeshedBuilderRoutes,
    AboutRoutes,
    HomeRoutes
  ]
}

export default routes
