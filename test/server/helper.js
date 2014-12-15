'use strict';

var supertest = require('supertest-as-promised'),
  path = require('path');

var app = require('../../server'),
  config = app.config,
  models = app.models,
  s3 = app.helpers.s3;

exports.expect = global.expect = require('chai').expect;
exports.request = supertest(app.init());
exports.fixtures = path.resolve(__dirname, './fixtures');
exports.app = app;
exports.config = config;
exports.models = models;
exports.s3 = s3;
