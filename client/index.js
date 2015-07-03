// Polyfill
import 'whatwg-fetch'

// Modules
import app from './app'
import debug from 'debug'
import React from 'react'
import hotkey from 'react-hotkey'
import { createElementWithContext } from 'fluxible-addons-react'
// import { FluxibleComponent } from 'fluxible/addons'
import BrowserHistory from 'react-router/lib/BrowserHistory'

const log = debug('bshed:client')

// needed for onTouchTap
// require('react-tap-event-plugin')()

// Get application node, create application context
const mountNode = document.getElementById('bshed')

// Debug messages
if (process.env.NODE_ENV !== 'production') {
  debug.enable('bshed:*,Fluxible:*')
}

// Rehydrate if global.BSHED is defined
// Otherwise bootstrap with a new context
if (global.BSHED) {
  app.rehydrate(global.BSHED, bootstrap)
} else {
  bootstrap(null, app.createContext())
}

/**
 * bootstrap
 * Start router and get everything going
 */
function bootstrap (err, context) {
  if (err) throw err

  // For chrome dev tool support and debugging
  global.context = context
  global.React = React

  // Global hotkeys
  log('activating hotkeys')
  hotkey.activate()

  // Router history
  const history = new BrowserHistory()

  // Start router
  log('starting router')
  React.render(createElementWithContext(context, { history }), mountNode, () => {
    log('React rendered')
  })
  // context.getActionContext().router.run(routerAction(context))
}

/**
 * routerAction
 * Calls navigate action and then render the app
 */
// function routerAction (context) {
//   return async function runRouterAction (Root, state) {
//     log('executing navigate action')
//     await context.executeAction(NavigateActions.router, state)

//     log('rendering application')
//     await render({context, Root})
//     log('navigation and rendering finished')
//   }
// }

/**
 * render
 * Render Root with context
 */
// function render ({Root, context}={}) {
//   return new Promise(resolve => {
//     const element = (
//       <FluxibleComponent context={context.getComponentContext()}>
//         <Root/>
//       </FluxibleComponent>
//     )

//     React.render(element, mountNode, resolve)
//   })
// }

/* ****************************************************************** */

// // Polyfills
// import 'whatwg-fetch'

// // Modules
// import React from 'react'
// import debug from 'debug'
// import app from './app'

// const log = debug('bshed:client:bootstrap')

// // Get application node
// const mountNode = document.getElementById('bshed')

// // Debug messages
// if (process.env.NODE_ENV !== 'production') {
//   debug.enable('bshed:*,Fluxible:*')
// }

// // Rehydrate if global.app is defined
// // Otherwise bootstrap with a new context
// if (global.app) {
//   app.rehydrate(global.app, bootstrap)
// } else {
//   bootstrap(null, app.createContext())
// }

// /**
//  * Bootstrap the app
//  */
// function bootstrap (err, context) {
//   if (err) throw err

//   // For chrome dev tool support and debugging
//   global.context = context
//   global.React = React

//   log('React rendering')
//   React.render(context.createElement(), mountNode, () => {
//     log('React rendered')
//   })
// }
