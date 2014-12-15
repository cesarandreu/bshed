'use strict';

var helper = require('../helper');

var models = helper.models,
  Vote = models.Vote,
  Bikeshed = models.Bikeshed,
  Image = models.Image;

var vote;

describe('Model:Vote', function () {

  beforeEach(function* () {

    vote = yield Vote.create({
      value: 5
    });
  });

  describe('Schema', function () {

    it('should have a valid schema', function () {
      expect(vote).to.be.an('object');
      expect(vote.id).to.be.a('number');
      expect(vote.value).to.be.a('number').and.to.equal(5);
    });

  });

});
