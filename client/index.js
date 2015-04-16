var co = require('co'),
  React = require('react'),
  debug = require('debug'),
  log = debug('bshed:client'),
  hotkey = require('react-hotkey'),
  {FluxibleComponent} = require('fluxible/addons')

var NavigateAction = require('./app/Application/actions/NavigateAction'),
  app = require('./app')

// needed for onTouchTap
// breaks with react v0.13
// require('react-tap-event-plugin')()

// assets
require('./styles/imports.less')
require('./styles/base.less')
require('./components/styles.less')
require('./app/Application/styles.less')
require('./app/Home/styles.less')

var mountNode = document.getElementById('bshed') // render node

if (process.env.NODE_ENV !== 'production') {
  global.React = React // For chrome dev tool support
  debug.enable('bshed:*')
}

log('rehydrating application')
app.rehydrate(global.BSHED, (err, context) => {
  if (err) throw err
  if (process.env.NODE_ENV !== 'production')
    global.context = context // For debugging

  log('activating hotkeys')
  hotkey.activate()

  log('starting router')
  context.getActionContext().router.run(co.wrap(routerAction(context)))
})

var firstRender = true
function routerAction (context) {
  return function* (Handler, state) {
    // Don't call the action on the first render on top of the server rehydration
    // Otherwise there is a race condition where the action gets executed before
    // render has been called, which can cause the checksum to fail.
    if (!firstRender) {
      try {
        log('executing navigate action')
        yield context.executeAction(NavigateAction, state)
      } catch (err) {
        console.error('Error executing navigate action', err)
        throw err
      }
    } else {
      firstRender = false
    }

    log('rendering application')
    yield render({context, Handler})

    log('navigation and rendering finished')
  }
}

function render ({context, Handler}={}) {
  var element = (
    <FluxibleComponent context={context.getComponentContext()}>
      <Handler/>
    </FluxibleComponent>
  )
  return new Promise(resolve => React.render(element, mountNode, resolve))
}
