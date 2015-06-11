// Polyfill
require('whatwg-fetch')

// Modules
const app = require('./app')
const debug = require('debug')
const log = debug('bshed:client')
const React = require('react/addons')
const hotkey = require('react-hotkey')
const {FluxibleComponent} = require('fluxible/addons')
const NavigateActions = require('./actions/NavigateActions')

// needed for onTouchTap
// breaks with react v0.13
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

  // Start router
  log('starting router')
  context.getActionContext().router.run(routerAction(context))
}

/**
 * routerAction
 * Calls navigate action and then render the app
 */
function routerAction (context) {
  return async function runRouterAction (Root, state) {
    log('executing navigate action')
    await context.executeAction(NavigateActions.router, state)

    log('rendering application')
    await render({context, Root})
    log('navigation and rendering finished')
  }
}

/**
 * render
 * Render Root with context
 */
function render ({Root, context}={}) {
  return new Promise(resolve => {
    const element = (
      <FluxibleComponent context={context.getComponentContext()}>
        <Root/>
      </FluxibleComponent>
    )

    React.render(element, mountNode, resolve)
  })
}
