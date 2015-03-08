'use strict'

var {models: {Vote}, expect} = require('./helper')
var vote

describe('Model:Vote', function () {

  beforeEach(function* () {

    vote = yield Vote.create({
      value: 5
    })
  })

  describe('Schema', function () {

    it('should have a valid schema', function () {
      expect(vote).to.be.an('object')
      expect(vote.id).to.be.a('number')
      expect(vote.value).to.be.a('number').and.to.equal(5)
    })

  })

})
