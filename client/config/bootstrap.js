/**
 * Bootstrap
 * Client entry point
 * @flow
 */

// Polyfills
import 'babel/polyfill'

// Modules
import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router'
import { createHistory } from 'history'
import ReactRouterRelay from 'react-router-relay'

// Routes
import routes from './routes'

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
