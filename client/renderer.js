var React = require('react'),
  Router = require('react-router'),
  serialize = require('serialize-javascript'),
  log = require('debug')('bshed:client:renderer');

var Html = React.createFactory(require('./components/Html.jsx')),
  navigate = require('./actions/navigate'),
  app = require('./app');

module.exports = function renderer (opts={}) {
  var {path, request, assets} = opts;

  return new Promise(render);
  function render (resolve, reject) {
    var context = app.createContext({request});
    log(`router running ${path}`);

    Router.run(app.getAppComponent(), path, afterRouterRun);
    function afterRouterRun (Handler, state) {
      log('router finished');

      context.executeAction(navigate, state, afterNavigate);
      function afterNavigate () {
        log('generating BSHED');
        var BSHED = serialize(app.dehydrate(context));

        log('generating markup');
        var props = {context: context.getComponentContext()},
          markup = React.renderToString(React.createElement(Handler, props));

        log('generating html');
        var html = React.renderToStaticMarkup(Html({
            markup, assets, state: `window.BSHED=${BSHED}`,
            context: context.getComponentContext()
          }));

        log('renderer finished');
        resolve({body: html, type: 'html'});
      }
    }
  }
};
