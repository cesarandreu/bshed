'use strict';

var Sequelize = require('sequelize'),
  path = require('path'),
  fs = require('fs');

var assert = require('assert'),
  debug = require('debug')('bshed:models');

// Sequelize extensions~
Sequelize.prototype.Model.prototype.findStrict = function findStrict () {
  var args = arguments;
  return new Promise(function findStrictPromise (resolve, reject) {
    this.find.apply(this, args)
    .then(function (result) {
      if (!result) {
        reject(new Sequelize.prototype.Error('no result'));
      } else {
        resolve(result);
      }
    }, reject);
  }.bind(this));
};

/**
 * Model loader
 *
 * requires opts.database
 * returns models object
 */
module.exports = function modelsLoader (opts) {
  assert(opts);
  assert(opts.database);
  debug('loader:start');

  var models = {},
    config = opts.database,
    sequelize = new Sequelize(config.database, config.username, config.password, config);

  // Load models
  fs.readdirSync(__dirname)
  .filter(function (file) {
    return file.indexOf('.') !== 0 && file !== 'index.js';
  })
  .forEach(function (file) {
    var modelPath = path.join(__dirname, file);
    var model = sequelize.import(modelPath);
    models[model.name] = model;
    debug('%s loaded from file %s', model.name, modelPath);
  });

  // Associate and initialize models
  Object.keys(models)
  .forEach(function (name) {
    if ('associate' in models[name]) {
      debug('associate %s', name);
      models[name].associate(models);
    }
    if ('initialize' in models[name]) {
      debug('initialize %s', name);
      models[name].initialize(opts);
    }
  });

  models.sequelize = sequelize;
  models.Sequelize = Sequelize;

  debug('loader:end');
  return models;
};

