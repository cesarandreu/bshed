'use strict';

var some = require('lodash.some'),
  React = require('react'),
  serialize = require('serialize-javascript'),
  log = require('debug')('bshed:client:renderer'),
  navigateAction = require('flux-router-component').navigateAction;

var Html = React.createFactory(require('./components/Html.jsx')),
  routes = require('./configs/routes'),
  app = require('./app');

module.exports = function renderer (opts={}) {

  var {url, path, method, request, assets} = opts;

  function _renderer (resolve, reject) {
    if (!isReactRoute({path, method}))
      return reject({status: 400});

    var context = app.createContext({
      request: request
    });

    log(`navigating to ${url}`);
    context.getActionContext().executeAction(navigateAction, {url, method}, afterNavigate);

    function afterNavigate (err) {
      if (err) return reject(err);

      log('generating BSHED');
      var BSHED = serialize(app.dehydrate(context));

      log('rendering application into html');
      var AppComponent = app.getAppComponent();
      var html = React.renderToStaticMarkup(Html({
        assets: assets,
        state: `window.BSHED=${BSHED}`,
        context: context.getComponentContext(),
        markup: React.renderToString(AppComponent({
          context: context.getComponentContext()
        }))
      }));

      log('rendering finished');
      resolve({body: html, type: 'html'});
    }
  }

  return new Promise(_renderer);
};

function isReactRoute (_route) {
  return some(routes, function (route) {
    return _route.path.match(new RegExp(route.path)) &&
      route.method.toUpperCase() === _route.method;
  });
}
