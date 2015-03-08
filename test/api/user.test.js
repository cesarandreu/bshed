'use strict';

var helper = require('./helper'),
  request = helper.request,
  User = helper.models.User;

var user, headers, url, res;

describe('Request:User', function () {

  describe('GET /api/users/current', function () {

    beforeEach(function* () {
      url = '/api/users/current';
      user = yield User.create({
        name: 'Bob',
        email: 'bob@example.com'
      });
      headers = helper.buildHeaders({user: {id: user.id}});
    });

    it('returns 200 and current user', function* () {
      res = yield request.get(url).set(headers).expect(200);
      expect(res.body).to.be.an('object');
      ['id', 'name', 'email'].forEach(function (value) {
        expect(res.body[value]).to.equal(user[value]);
      });
    });

    it('returns 401 without headers', function* () {
      yield request.get(url).expect(401);
    });

    it('returns 401 when user isn\'t found', function* () {
      yield user.destroy();
      yield request.get(url).set(headers).expect(401);
    });

  });

});
