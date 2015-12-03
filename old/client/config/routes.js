/**
 * Routes
 * @flow
 */
import React from 'react'
import { IndexRoute, Route } from 'react-router'

// Queries
import ViewerQueries from '@client/queries/ViewerQueries'
import BikeshedQueries from '@client/queries/BikeshedQueries'

// Components
import { AppContainer } from '@client/containers/App'
import { BikeshedCreatorContainer } from '@client/containers/BikeshedCreator'
import { BikeshedExplorerContainer } from '@client/containers/BikeshedExplorer'
import { BikeshedViewerContainer } from '@client/containers/BikeshedViewer'

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

    <Route
      path='/bikesheds'
    >
      <IndexRoute
        component={BikeshedExplorerContainer}
      />
      <Route
        path=':bikeshedId'
        component={BikeshedViewerContainer}
        queries={BikeshedQueries}
      />
    </Route>
  </Route>
)
