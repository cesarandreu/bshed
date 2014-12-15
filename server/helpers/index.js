'use strict';

// modules
var path = require('path'),
  fs = require('fs'),
  debug = require('debug');

var log = debug('app:log:helpers');

// Load helpers
var helperModules = {};
fs.readdirSync(__dirname)
.filter(function (file) {
  return (file.indexOf('.') !== 0) && (file !== 'index.js');
})
.forEach(function (file) {
  var name = file.split('.').shift(),
    helperPath = path.join(__dirname, file);
  helperModules[name] = require(helperPath);
  log('%s loaded from file %s', name, helperPath);
});

// initialize helpers
module.exports = function initializeHelpers (opts) {
  log('%initializing helpers');
  var helpers = {}, helper, name;
  for (name in helperModules) {
    helper = helperModules[name];
    helpers[name] = (typeof helper === 'function') ? helper(opts.config) : helper;
    log('%s helper initialized', name);
  }
  return helpers;
};
