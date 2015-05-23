var {models} = require('./helper')
var expect = require('expect.js')
var {User} = models
var user

describe('Model:User', function () {

  describe('Schema', function () {

    beforeEach(async function () {
      user = await User.create({
        name: 'Foo',
        email: 'foo@example.com'
      })
    })

    it('should have a valid schema', function () {
      expect(user).to.be.an('object')
      expect(user.id).to.be.a('number')
      expect(user.name).to.be.a('string').and.to.equal('Foo')
      expect(user.email).to.be.a('string').and.to.equal('foo@example.com')
      expect(user.administrator).to.be.a('boolean').and.to.equal(false)
    })

  })

})
