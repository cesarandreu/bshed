'use strict';

var helper = require('./helper'),
  models = helper.models,
  Bikeshed = models.Bikeshed;

var bikeshed;

describe('Model:Bikeshed', function () {

  beforeEach(function* () {
    bikeshed = yield Bikeshed.create({
      name: 'bikeshed',
      body: 'description'
    });
  });

  describe('Schema', function () {

    it('should have a valid schema', function () {
      expect(bikeshed).to.be.an('object');
      expect(bikeshed.id).to.be.a('number');
      expect(bikeshed.name).to.be.a('string').and.to.equal('bikeshed');
      expect(bikeshed.body).to.be.a('string').and.to.equal('description');
    });

  });

});
