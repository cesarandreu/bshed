'use strict';

var api = {
  name: 'bshed-api',
  endpoint: '/api',
  middleware: {
    session: {
      key: 'bshed'
    }
  }
};

module.exports = function apiConfig (env) {
  api.secret = require('./secret')(env);
  api.env = env;
  return api;
};
