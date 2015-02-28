var debug = require('debug'),
  log = debug('bshed:client')

var React = require('react')

var app = require('./app'),
  navigate = require('./actions/navigate')

// needed for onTouchTap
require('react-tap-event-plugin')()

// assets
require('./assets/styles/index.less')

var mountNode = document.getElementById('bshed') // render node
var dehydratedState = window.BSHED // sent from server
window.React = React // For chrome dev tool support

if (process.env.NODE_ENV !== 'production')
  debug.enable('*')

log('rehydrating')
app.rehydrate(dehydratedState, rehydrateCallback)
function rehydrateCallback (err, context) {
  if (err) throw err
  if (process.env.NODE_ENV !== 'production')
    window.context = context

  log('starting router')
  context.getComponentContext().router.run(runCallback)
  function runCallback (Handler, state) {
    context.executeAction(navigate, state, navigateCallback)
    function navigateCallback (err) {
      if (err) console.error(err) // TODO: handle failure~

      log('rendering route')
      React.withContext(context.getComponentContext(), () => {
        React.render(React.createElement(Handler), mountNode, () => log('react rendered'))
      })
    }
  }
}
