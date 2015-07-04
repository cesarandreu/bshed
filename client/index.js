// Polyfill
import 'whatwg-fetch'

// Modules
import app from './app'
import debug from 'debug'
import React from 'react'
import hotkey from 'react-hotkey'
import BrowserHistory from 'react-router/lib/BrowserHistory'
import { createElementWithContext } from 'fluxible-addons-react'

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
}
