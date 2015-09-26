/**
 * Routes
 * @flow
 */
import React from 'react'
import { IndexRoute, Route } from 'react-router'

// Queries
import ViewerQueries from '../queries/ViewerQueries'

// Components
import { AppContainer } from '../components/App'
import { BikeshedCreatorContainer } from '../components/BikeshedCreator'

export default (
  <Route
    path='/'
    component={AppContainer}
    queries={ViewerQueries}
  >
    <IndexRoute
      component={BikeshedCreatorContainer}
      queries={ViewerQueries}
    />
  </Route>
)
