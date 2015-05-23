var {models} = require('./helper')
var expect = require('expect.js')
var {Rating} = models
var rating

describe('Model:Rating', function () {

  beforeEach(async function () {
    rating = await Rating.create()
  })

  describe('Schema', function () {

    it('should have a valid schema', function () {
      expect(rating).to.be.an('object')
      expect(rating.id).to.be.a('string')
    })

  })

})
