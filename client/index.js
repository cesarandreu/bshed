/**
 * Client entry-point
 * @flow
 */

// Polyfill
import 'whatwg-fetch'

// Modules
import { reduxRouteComponent } from 'redux-react-router'
import History from 'react-router/lib/BrowserHistory'
import createStore from './utils/createStore'
import { routes, reducers } from './app'
import { Router } from 'react-router'
import Fetcher from './lib/Fetcher'
import ReactDOM from 'react-dom'
import React from 'react'

// Instantiation
const fetcher = new Fetcher()
const history = new History()
const store = createStore({ fetcher, reducers })

// For chrome dev tool support and debugging
global.store = store
global.React = React

// Render
ReactDOM.render(
  <Router
    history={history}
    routes={{
      component: reduxRouteComponent(store),
      childRoutes: [ routes ]
    }}
  />,
  document.getElementById('app')
)
