/**
 * Client entry point
 */

// Polyfills
import 'babel-polyfill'

// Styles
import 'components/styles/resets.css'

// Modules
import raf from 'raf'
import { browserHistory } from 'react-router'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import Relay from 'react-relay'
import { RelayRouter } from 'react-router-relay'

// Routes
import routes from './routes'

// Store
import createAppStore from './createAppStore'
const store = global.store = createAppStore()

// Configure Relay's network layer to include cookies
Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer('/graphql', {
    credentials: 'same-origin'
  })
)

// Configure Relay's task scheduler to spread out task execution
Relay.injectTaskScheduler((task) => raf(task))

// Create the app node appended to the body
const app = document.body.appendChild(document.createElement('div'))

// Mount the app
ReactDOM.render(
  <Provider
    store={store}
  >
    <RelayRouter
      history={browserHistory}
      routes={routes}
    />
  </Provider>,
  app
)
