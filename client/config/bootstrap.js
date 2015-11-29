/**
 * Client entry point
 */

// Polyfills
import 'babel-polyfill'

// Modules
import React from 'react'
import Relay from 'react-relay'
import ReactDOM from 'react-dom'
import { createHistory } from 'history'
import { RelayRouter } from 'react-router-relay'

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

// Create the app node appended to the body
const app = document.body.appendChild(document.createElement('div'))

// Mount the app
ReactDOM.render(
  <RelayRouter
    history={history}
    routes={routes}
  />,
  app
)
