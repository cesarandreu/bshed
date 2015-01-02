'use strict';

var supertest = require('supertest-as-promised'),
  helper = require('../helper');

exports = module.exports = helper;
exports.request = supertest(helper.api.callback());
