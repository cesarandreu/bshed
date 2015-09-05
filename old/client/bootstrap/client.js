/**
 * Client bootstrap
 * @flow
 */
// Hot module replacement
if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('../reducers', () => {
    store.replaceReducer(combineReducers(reducers))
  })
}

// Polyfill
import 'whatwg-fetch'

// Modules
import createExecuteRequest from '../lib/createExecuteRequest'
import ApplicationContainer from '../containers/Application'
import History from 'react-router/lib/BrowserHistory'
import createAppStore from '../lib/createAppStore'
import createFetcher from '../lib/createFetcher'
import * as reducers from '../reducers'
import { combineReducers } from 'redux'
import ReactDOM from 'react-dom'
import React from 'react'

// Instantiation
const history = new History()
const fetcher = createFetcher()
const executeRequest = createExecuteRequest(fetcher)
const store = createAppStore({ fetcher, executeRequest, reducers })

// For chrome dev tool support and debugging
global.store = store
global.React = React

// Render
ReactDOM.render(
  <ApplicationContainer
    history={history}
    store={store}
  />,
  document.getElementById('app')
)
