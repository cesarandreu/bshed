'use strict';

var _ = require('lodash'),
  React = require('react'),
  thunkify = require('thunkify'),
  request = require('supertest'),
  compose = require('koa-compose'),
  serialize = require('serialize-javascript'),
  log = require('debug')('bshed:client:middleware'),
  navigateAction = require('flux-router-component').navigateAction;

var Html = React.createFactory(require('./components/Html.jsx')),
  routes = require('./configs/routes'),
  app = require('./app');

module.exports = compose([checkRoute, client]);

function* client () {
  var context = app.createContext({
    request: request(this.app.callback())
  });

  var executeAction = thunkify(context.getActionContext().executeAction);
  try {
    log('navigating');
    yield executeAction(navigateAction, {url: this.url, method: this.method});
  } catch (err) {
    if (err && err.status) this.throw(err.status);
    else this.throw(500);
  }

  log('exposing context state');
  var exposed = `window.App=${serialize(app.dehydrate(context))};`;

  log('rendering application component into html');
  var AppComponent = app.getAppComponent();
  var html = React.renderToStaticMarkup(Html({
    state: exposed,
    context: context.getComponentContext(),
    markup: React.renderToString(AppComponent({
      context: context.getComponentContext()
    }))
  }));

  log('sending markup');
  this.type = 'html';
  this.body = html;
}

function* checkRoute (next) {
  if (isReactRoute({path: this.path, method: this.method}))
    yield next;
}

function isReactRoute (_route) {
  return _.some(routes, function (route) {
    return _route.path.match(new RegExp(route.path)) &&
      route.method.toUpperCase() === _route.method;
  });
}
