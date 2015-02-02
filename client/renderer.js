var React = require('react'),
  serialize = require('serialize-javascript'),
  log = require('debug')('bshed:client:renderer');

var Html = React.createFactory(require('./components/Html.jsx')),
  navigate = require('./actions/navigate'),
  app = require('./app');

module.exports = function renderer (opts={}) {
  var {url, request, assets} = opts;

  return new Promise(render);
  function render (resolve, reject) {
    var context = app.createContext({request, url});

    log(`router running to ${url}`);
    context.getComponentContext().router.run(runCallback);
    function runCallback (Handler, state) {
      log('router finished');

      context.executeAction(navigate, state, navigateCallback);
      function navigateCallback (err) {
        if (err) return reject(err);

        log('generating BSHED');
        var BSHED = `window.BSHED=${serialize(app.dehydrate(context))}`;

        log('generating markup');
        var markupProps = {context: context.getComponentContext()},
          markup = React.renderToString(React.createElement(Handler, markupProps));

        log('generating html');
        var htmlProps = {markup, assets, BSHED, context: context.getComponentContext()},
          html = React.renderToStaticMarkup(Html(htmlProps));

        log('renderer finished');
        resolve({body: html, type: 'html'});
      }
    }
  }
};
