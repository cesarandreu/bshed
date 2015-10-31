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
import { AppContainer } from '@components/App'
import { BikeshedCreatorContainer } from '@components/BikeshedCreator'
import { BikeshedExplorerContainer } from '@components/BikeshedExplorer'
import { BikeshedViewerContainer } from '@components/BikeshedViewer'

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
