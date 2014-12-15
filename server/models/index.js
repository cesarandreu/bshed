'use strict';

// modules
var Sequelize = require('sequelize'),
  path = require('path'),
  fs = require('fs'),
  debug = require('debug'),
  log = debug('app:log:models');

// Sequelize extensions~

/**
 * Instance.toPublicJSON()
 * Returns instance.toJSON() with privateAttributes hidden
 */
Sequelize.prototype.Instance.prototype.toPublicJSON = function toPublicJSON () {
  var instanceJSON = this.toJSON();
  (this.Model.privateAttributes || [])
  .forEach(function (name) {
    if (instanceJSON.hasOwnProperty(name)) {
      delete instanceJSON[name];
    }
  });
  return instanceJSON;
};

module.exports = function models (opts) {
  var dbConfig = opts.config.database;
  var sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);

  // Load models
  var db = {};
  fs.readdirSync(__dirname)
  .filter(function (file) {
    return (file.indexOf('.') !== 0) && (file !== 'index.js');
  })
  .forEach(function (file) {
    var modelPath = path.join(__dirname, file);
    var model = sequelize.import(modelPath);
    db[model.name] = model;
    log('%s loaded from file %s', model.name, modelPath);
  });

  // Associate models
  Object.keys(db)
  .forEach(function (modelName) {
    if ('associate' in db[modelName]) {
      log('calling associate on %s', modelName);
      db[modelName].associate(db);
    }
    if ('initialize' in db[modelName]) {
      log('calling initialize on %s', modelName);
      db[modelName].initialize(opts);
    }
  });

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;

  return db;
};
