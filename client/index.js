/**
 * Client entry-point
 * @flow
 */

// Polyfill
import 'whatwg-fetch'

// Modules
import { reduxRouteComponent } from 'redux-react-router'
import History from 'react-router/lib/BrowserHistory'
import * as observables from './utils/observables'
import createFetcher from './lib/createFetcher'
import { observableFromStore } from 'redux-rx'
import createStore from './utils/createStore'
import { routes, reducers } from './app'
import { Router } from 'react-router'
import ReactDOM from 'react-dom'
import React from 'react'

// Instantiation
const history = new History()
const { fetcher, executeRequest } = createFetcher()
const store = createStore({ fetcher, executeRequest, reducers })
const state$ = observableFromStore(store)

// For chrome dev tool support and debugging
global.store = store
global.React = React

// Navigate actions observer
observables.navigateActions(state$, routes)
.forEach(action => {
  console.log('action next', action)
  store.dispatch(action(store.getState().router))
}, (x) => {
  console.error('x error', x)
}, (x) => {
  console.info('x info', x)
})

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
