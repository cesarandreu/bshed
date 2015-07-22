// Polyfill
import 'whatwg-fetch'

// Modules
import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { reduxRouteComponent } from 'redux-react-router'
import History from 'react-router/lib/BrowserHistory'
import * as reducers from './reducers'
import { Router } from 'react-router'
import ReactDOM from 'react-dom'
import thunk from 'redux-thunk'
import routes from './routes'
import React from 'react'

const { DevTools, DebugPanel, LogMonitor } = require('redux-devtools/lib/react')
const { devTools, persistState } = require('redux-devtools')

const finalCreateStore = compose(
  applyMiddleware(thunk),
  devTools(),
  persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)),
  createStore
)

const reducer = combineReducers({ ...reducers })
const store = finalCreateStore(reducer)

const wrappedRoutes = {
  component: reduxRouteComponent(store),
  childRoutes: [
    routes
  ]
}

const history = new History()
ReactDOM.render(
  <div>
    <Router history={history} routes={wrappedRoutes}/>
    <DebugPanel top right bottom key='debugPanel'>
      <DevTools store={store} monitor={LogMonitor}/>
    </DebugPanel>
  </div>,
  document.getElementById('bshed')
)

// // Polyfill
// import 'whatwg-fetch'

// // Modules
// import { createStore, applyMiddleware, combineReducers } from 'redux'
// import { reduxRouteComponent } from 'redux-react-router'
// import History from 'react-router/lib/BrowserHistory'
// import * as reducers from './reducers'
// import { Router } from 'react-router'
// import ReactDOM from 'react-dom'
// import thunk from 'redux-thunk'
// import routes from './routes'
// import React from 'react'

// const createStoreWithMiddleware = applyMiddleware(thunk)(createStore)
// const reducer = combineReducers({ ...reducers })
// const store = createStoreWithMiddleware(reducer)

// const wrappedRoutes = {
//   component: reduxRouteComponent(store),
//   childRoutes: [
//     routes
//   ]
// }

// const history = new History()
// ReactDOM.render(
//   <Router history={history} routes={wrappedRoutes}/>,
//   document.getElementById('bshed')
// )
