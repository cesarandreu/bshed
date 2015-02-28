var co = require('co'),
  debug = require('debug'),
  React = require('react'),
  log = debug('bshed:client')

var navigate = require('./actions/navigate'),
  app = require('./app')

// needed for onTouchTap
require('react-tap-event-plugin')()

// assets
require('./assets/styles/index.less')

var mountNode = document.getElementById('bshed') // render node

if (process.env.NODE_ENV !== 'production') {
  window.React = React // For chrome dev tool support
  debug.enable('*')
}

log('rehydrating application')
app.rehydrate(window.BSHED, (err, context) => {
  if (err) throw err
  if (process.env.NODE_ENV !== 'production')
    window.context = context // For debugging

  log('starting router')
  context.getComponentContext().router.run(co.wrap(routerAction(context)))
})

function routerAction (context) {
  return function* (Handler, state) {
    try {
      log('executing navigate action')
      yield context.executeAction(navigate, state)
    } catch (err) {
      console.error('Error executing navigate action', err)
      throw err
    }

    log('rendering application')
    yield render({context, Handler})
  }
}

function render ({context, Handler}={}) {
  return new Promise(resolve => {
    React.withContext(context.getComponentContext(), () => {
      React.render(React.createElement(Handler), mountNode, () => log('application rendered'))
    })
  })
}
