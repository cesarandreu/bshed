/**
 * Routes
 * @flow
 */
import Layout from '../containers/Layout'
import { BikeshedBuilderPage } from '../pages/BikeshedBuilder'
import { AboutPage } from '../pages/About'

// Routes
export default {
  component: Layout,
  childRoutes: [{
    path: '/',
    component: BikeshedBuilderPage
  }, {
    path: '/about',
    component: AboutPage
  }]
}
