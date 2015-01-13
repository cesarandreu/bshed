'use strict';

var React = require('react'),
  debug = require('debug'),
  log = debug('bshed:client'),
  app = require('./app');

var dehydratedState = window.App; // sent from server
window.React = React; // For chrome dev tool support

if (process.env.NODE_ENV !== 'production')
  debug.enable('*');

log('rehydrating bshed:client');
app.rehydrate(dehydratedState, function (err, context) {
  if (err) throw err;

  var mountNode = document.getElementById('bshed');
  window.context = context;
  log('react rendering');
  React.render(app.getAppComponent()({
    context: context.getComponentContext()
  }), mountNode, function () {
    log('react rendered');
  });

});
