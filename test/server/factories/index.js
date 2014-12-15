// 'use strict';

// // modules
// var path = require('path'),
//   fs = require('fs'),
//   debug = require('debug');

// var log = debug('app:test:factory');

// module.exports = function getFactories (models) {
//   // Load factories
//   var factories = {};
//   fs.readdirSync(__dirname)
//   .filter(function (file) {
//     return (file.indexOf('.') !== 0) && (file !== 'index.js');
//   })
//   .forEach(function (file) {
//     var factoryPath = path.join(__dirname, file);
//     var factory = require(factoryPath);
//     factories[factory.name] = factory.init(models[factory.name]);
//     log('%s loaded from file %s', factory.name, factoryPath);
//   });

//   return factories;
// };

