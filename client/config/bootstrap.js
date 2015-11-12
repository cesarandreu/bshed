/**
 * Bootstrap
 * Client entry point
 * @flow
 */

// Polyfills
import 'babel/polyfill'

// CSS Grid polyfill
import 'css-polyfills'

// Modules
import React from 'react'
import Relay from 'react-relay'
import ReactDOM from 'react-dom'
import { Router } from 'react-router'
import { createHistory } from 'history'
import ReactRouterRelay from 'react-router-relay'

// Routes
import routes from './routes'

// Configure Relay's network layer to include cookies
Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer('/graphql', {
    credentials: 'same-origin'
  })
)

// Initialize dependencies
const history = createHistory()

// Mount the app
const instance = ReactDOM.render(
  <Router
    createElement={ReactRouterRelay.createElement}
    history={history}
    routes={routes}
  />,
  document.getElementById('app')
)

// Fix hotloading for pure components
// @TODO: handle updating the routes
if (module.hot) {
  module.hot.accept('./routes', () => {
    instance.forceUpdate()
  })
}
