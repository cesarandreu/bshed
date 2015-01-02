'use strict';

var helper = require('./helper');

var User = helper.models.User;

var user;

describe('Model:User', function () {

  describe('Schema', function () {

    beforeEach(function* () {
      user = yield User.create({
        name: 'Foo',
        email: 'foo@example.com'
      });
    });

    it('should have a valid schema', function () {
      expect(user).to.be.an('object');
      expect(user.id).to.be.a('number');
      expect(user.name).to.be.a('string').and.to.equal('Foo');
      expect(user.email).to.be.a('string').and.to.equal('foo@example.com');
      expect(user.administrator).to.be.a('boolean').and.to.equal(false);
    });

  });

  describe('attributes', function () {

    it('has jsonAttributes', function () {
      var keys = ['administrator', 'createdAt', 'email', 'id', 'name', 'updatedAt'];
      expect(User.jsonAttributes).to.be.an('array').and.to.include.members(keys);
    });

  });


});
