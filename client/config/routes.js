/**
 * Route definitions
 */
import React from 'react'
import { IndexRedirect, IndexRoute, Route } from 'react-router'

// Pages
import Home from 'client/pages/Home'
import Terms from 'client/pages/Terms'
import BikeshedViewer from 'client/pages/BikeshedViewer'

// Queries
import ViewerQueries from 'client/queries/ViewerQueries'
import BikeshedQueries from 'client/queries/BikeshedQueries'

export default (
  <Route
    path='/'
  >
    <IndexRoute
      component={Home}
      queries={ViewerQueries}
    />

    <Route path='/bikesheds'>
      <IndexRedirect to='/'/>

      <Route
        component={BikeshedViewer}
        path=':bikeshedId'
        queries={BikeshedQueries}
      />
    </Route>

    <Route
      component={Terms}
      path='/terms'
    />
  </Route>
)
