'use strict';

var helper = require('../helper'),
  request = helper.request,
  config = helper.config;

var User = helper.models.User;

var user, headers, url, res;

describe('Request:User', function () {

  describe('GET /api/users/current', function () {

    beforeEach(function* () {
      url = '/api/users/current';
      user = yield User.create({
        name: 'Bob',
        email: 'bob@example.com'
      });
      headers = {
        authorization: 'Bearer ' + user.token({secret: config.secret})
      };
    });

    it('returns current user', function* () {
      res = yield request.get(url).set(headers).expect(200);
      expect(res.body).to.be.an('object').and.to.have.keys(User.jsonAttributes);
      expect(res.body.name).to.equal(user.name);
      expect(res.body.email).to.equal(user.email);
    });

    it('returns 401 without authorization header', function* () {
      yield request.get(url).expect(401);
    });

    it('returns 401 with invalid secret', function* () {
      headers.authorization = 'Bearer ' + user.token({secret: ' '});
      yield request.get(url).set(headers).expect(401);
    });

    it('returns 401 with invalid token', function* () {
      headers.authorization = 'Bearer token';
      yield request.get(url).set(headers).expect(401);
    });

    it('returns 404 when user isn\'t found', function* () {
      yield user.destroy();
      yield request.get(url).set(headers).expect(404);
    });

  });

});
