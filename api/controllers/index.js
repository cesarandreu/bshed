'use strict';

var fs = require('fs'),
  path = require('path'),
  assert = require('assert'),
  compose = require('koa-compose'),
  debug = require('debug')('bshed:api:controllers');

function controllers (helpers) {
  assert(helpers);

  debug('middleware:start');
  var middleware = Object.keys(controllers)
  .map(function (name) {
    debug('initializing %s', name);
    return controllers[name](helpers);
  });
  debug('middleware:end');
  return compose(middleware);
}

// Load controllers
debug('load:start');
fs.readdirSync(__dirname)
.filter(function (file) {
  return file.indexOf('.') !== 0 && file !== 'index.js';
})
.forEach(function (file) {
  var name = file.split('_controller').shift();
  var controllerPath = path.join(__dirname, file);
  controllers[name] = require(controllerPath);
  debug('%s loaded from %s', name, controllerPath);
});
debug('load:end');

module.exports = controllers;
