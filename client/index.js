require('6to5/runtime');
var React = require('react'),
  Router = require('react-router'),
  debug = require('debug'),
  log = debug('bshed:client'),
  app = require('./app'),
  {HistoryLocation} = Router;

// needed for onTouchTap
require('react-tap-event-plugin')();

// assets
require('./assets/styles/index.less');

var dehydratedState = window.BSHED; // sent from server
window.React = React; // For chrome dev tool support

if (process.env.NODE_ENV !== 'production')
  debug.enable('*');

log('rehydrating');
app.rehydrate(dehydratedState, rehydrateCallback);
function rehydrateCallback (err, context) {
  if (err) throw err;
  window.context = context;

  log('router running');
  Router.run(app.getAppComponent(), HistoryLocation, routerCallback);
  function routerCallback (Handler, state) {
    var mountNode = document.getElementById('bshed'),
      props = {context: context.getComponentContext()},
      handler = React.createElement(Handler, props);

    log('react rendering');
    React.render(handler, mountNode, () => log('react rendered'));
  }
}
