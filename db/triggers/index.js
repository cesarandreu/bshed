'use strict';

var fs = require('fs'),
  path = require('path');

var triggers = function triggers (name) {
  return fs.readFileSync(path.resolve(__dirname, name + '.sql'), {encoding: 'utf8'});
};

triggers.up = function up (name) {
  return triggers(name + '.up');
};

triggers.down = function down (name) {
  return triggers(name + '.down');
};

triggers.migration = function migration (name) {
  return {
    up: function(migration, DataTypes, done) {
      migration.sequelize.query(triggers.up(name))
      .then(function () {
        done();
      }, function (err) {
        console.error(err);
        done(err);
      });
    },

    down: function(migration, DataTypes, done) {
      migration.sequelize.query(triggers.down(name))
      .then(function () {
        done();
      }, function (err) {
        console.error(err);
        done(err);
      });
    }
  };
};

module.exports = triggers;
