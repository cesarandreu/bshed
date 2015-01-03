'use strict';

var helper = require('./helper'),
  models = helper.models,
  Bike = models.Bike;

var bike, error;

describe('Model:Bike', function () {

  beforeEach(function* () {
    error = null;
    bike = yield Bike.create({
    });
  });

  describe('Schema', function () {

    it('should have a valid schema', function () {
      expect(bike).to.be.an('object');
      expect(bike.id).to.be.a('number');
    });

  });


  describe('methods', function () {
  });

});
