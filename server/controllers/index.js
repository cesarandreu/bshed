'use strict';

// modules
var path = require('path'),
  fs = require('fs'),
  debug = require('debug'),
  compose = require('koa-compose');

var log = debug('app:log:controllers');

// Load controllers
var controllers = {};
fs.readdirSync(__dirname)
.filter(function (file) {
  return (file.indexOf('.') !== 0) && (file !== 'index.js');
})
.forEach(function (file) {
  var name = file.split('_controller.').shift();
  var controllerPath = path.join(__dirname, file);
  module.exports[name] = controllers[name] = require(controllerPath);
  log('%s loaded from file %s', name, controllerPath);
});

// Get all controller middleware
exports.middleware = function middleware (helpers) {
  var controllerMiddleware = [];
  for (var name in controllers) {
    controllerMiddleware.push(controllers[name](helpers));
    log('%s controller initialized', name);
  }
  return compose(controllerMiddleware);
};
