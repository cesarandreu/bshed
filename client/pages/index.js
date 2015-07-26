/**
 * Pages
 * @flow
 */

// Application
import { ApplicationContainer } from './Application'

// Pages
import { routes as BikeshedBuilderRoutes } from './BikeshedBuilder'
import { routes as AboutRoutes } from './About'
import { routes as HomeRoutes } from './Home'

// Routes
export const routes = {
  component: ApplicationContainer,
  childRoutes: [
    BikeshedBuilderRoutes,
    AboutRoutes,
    HomeRoutes
  ]
}
