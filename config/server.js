'use strict';

var path = require('path'),
  _ = require('lodash');

var server = {
  name: 'bshed-server',
  assets: path.resolve(__dirname, '../public'),
  middleware: {
    serve: {},
    session: {
      key: 'bshed'
    }
  }
};

var environment = {
  development: {
    port: 3000
  },
  test: {
    post: 4000
  },
  production : {
    port: process.env.PORT || 3000,
    serve: {
      maxage: 1000 * 60 * 60 * 24 * 7 // 7 days
    }
  }
};

module.exports = function serverConfig (env) {
  server.env = env;
  return _.merge(server, environment[env]);
};
