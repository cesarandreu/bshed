'use strict';

var React = require('react'),
  Fluxible = require('fluxible'),
  routrPlugin = require('fluxible-plugin-routr');

var app = new Fluxible({
  appComponent: React.createFactory(require('./components/Application.jsx'))
});

app.plug(routrPlugin({
  routes: require('./configs/routes'),
  request: require('./request.client.js')
}));

app.registerStore(require('./stores/ApplicationStore.js'));

module.exports = app;
