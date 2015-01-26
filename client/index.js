require('6to5/runtime');
var debug = require('debug'),
  log = debug('bshed:client');

var React = require('react');

var app = require('./app'),
  navigate = require('./actions/navigate');

// needed for onTouchTap
require('react-tap-event-plugin')();

// assets
require('./assets/styles/index.less');

var mountNode = document.getElementById('bshed'); // render node
var dehydratedState = window.BSHED; // sent from server
window.React = React; // For chrome dev tool support

if (process.env.NODE_ENV !== 'production')
  debug.enable('*');

log('rehydrating');
app.rehydrate(dehydratedState, rehydrateCallback);
function rehydrateCallback (err, context) {
  if (err) throw err;
  if (process.env.NODE_ENV !== 'production')
    window.context = context;

  log('starting router');
  context.getComponentContext().router.run(runCallback);
  function runCallback (Handler, state) {
    context.executeAction(navigate, state, navigateCallback);
    function navigateCallback () {
      var handler = React.createElement(Handler, {
        context: context.getComponentContext()
      });

      log('rendering route');
      React.render(handler, mountNode, () => log('react rendered'));
    }
  }
}
