'use strict'

var helper = require('./helper'),
  models = helper.models,
  Bike = models.Bike

var bike

describe('Model:Bike', function () {

  beforeEach(function* () {
    bike = yield Bike.create({
      name: 'bike',
      body: 'description'
    })
  })

  describe('Schema', function () {

    it('should have a valid schema', function () {
      expect(bike).to.be.an('object')
      expect(bike.id).to.be.a('number')
    })

  })


  describe('methods', function () {
  })

})
