var {models} = require('./helper')
var expect = require('expect.js')
var {Vote} = models
var vote

describe('Model:Vote', function () {

  beforeEach(async function () {
    vote = await Vote.create({
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
