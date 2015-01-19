'use strict';

var React = require('react'),
  Fluxible = require('fluxible'),
  routrPlugin = require('fluxible-plugin-routr');

var app = new Fluxible({
  appComponent: React.createFactory(require('./components/Application.jsx'))
});

// request: require('./request.client.js')

app.plug(routrPlugin({
  routes: require('./configs/routes')
}));

app.registerStore(require('./stores/ApplicationStore.js'));
app.registerStore(require('./stores/LayoutStore.js'));

module.exports = app;
