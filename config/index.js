'use strict';

var debug = require('debug')('bshed:config'),
  fs = require('fs');

// Base config
var config = {
  env: (process.env.NODE_ENV || 'development').toLowerCase()
};
debug('using %s env', config.env);

// Get configs and load them
debug('loader:start');
fs.readdirSync(__dirname)
.filter(function (file) {
  return file.indexOf('.') !== 0 && file !== 'index.js';
})
.forEach(function (name) {
  name = name.split('.js').shift();
  config[name] = load(name);
});
debug('loader:end');
module.exports = config;

/**
 * Configuration loader
 * - loads './${name}'
 *
 * Loading strategies in order of execution:
 *  - use nameConfig[env] if env is in nameConfig
 *  - pass env to nameConfig if nameConfig is a function
 *  - keep nameConfig as is
 */
function load (name) {
  debug('loading %s', name);
  var configuration = require('./' + name);
  if (config.env in configuration) {
    debug('using %s env from %s', config.env, name);
    configuration = configuration[config.env];
  } else if (typeof configuration === 'function') {
    debug('using %s env to initialize %s', config.env, name);
    configuration = configuration(config.env);
  } else {
    debug('using %s directly', name);
  }
  return configuration;
}
