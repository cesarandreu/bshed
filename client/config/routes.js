/**
 * Routes
 * @flow
 */
import React from 'react'
import { IndexRoute, Route } from 'react-router'

// Queries
import ViewerQueries from '../queries/ViewerQueries'

// Components
import App from '../components/App'
import BikeshedCreator from '../components/BikeshedCreator'

export default (
  <Route
    path='/'
    component={App}
    queries={ViewerQueries}
  >
    <IndexRoute
      component={BikeshedCreator}
    />
  </Route>
)
