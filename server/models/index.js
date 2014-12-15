'use strict';

// modules
var Sequelize = require('sequelize'),
  path = require('path'),
  fs = require('fs'),
  debug = require('debug');

// TODO: refactor this to accept config~ DI is good~
var config = require('../../config').database,
  log = debug('app:log:models');

// Sequelize extensions~

// /**
//  * Model.safeBuild()
//  * Returns model.build using only safe attributes
//  */
// Sequelize.prototype.Model.prototype.safeBuild = function safeBuild (attributes) {
//   attributes = attributes || {};

//   var instanceAttributes = {};
//   (this.safeAttributes || [])
//   .forEach(function (name) {
//     if (attributes.hasOwnProperty(name)) {
//       instanceAttributes[name] = attributes[name];
//     }
//   });
//   return this.build(instanceAttributes);
// };

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

var sequelize = new Sequelize(config.database, config.username, config.password, config);

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
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
