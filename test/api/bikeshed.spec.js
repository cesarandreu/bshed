'use strict';

var _ = require('lodash'),
  path = require('path');

var helper = require('./helper'),
  request = helper.request,
  models = helper.models;

var {Bikeshed, User, Bike, Vote} = models;

var svgPath = path.join(helper.fixtures, 'invalid.svg'),
  jpgPath = path.join(helper.fixtures, 'puppy_01.jpg');

var user, bikeshed, bikes, votes, attributes, res, url, headers, body, schema, bikesIndex;
var UserId, BikeshedId;

describe('Request:Bikeshed', function () {

  beforeEach(function* () {
    user = yield User.create();
    attributes = {UserId: user.id};
    body = { name: 'bikeshed', body: 'description' };
    headers = helper.buildHeaders({user: {id: user.id}});
  });

  // index
  describe('GET /api/bikesheds', function () {
    beforeEach(function* () {
      url = '/api/bikesheds';
      schema = {
        title: 'GET /api/bikesheds response',
        type: 'object',
        properties: {
          sortBy: { type: 'string', required: true,
            enum: ['id', 'name', 'createdAt', 'updatedAt']
          },
          direction: { type: 'string', required: true, enum: ['ASC', 'DESC'] },
          per: { type: 'number', required: true, minimum: 1, maximum: 96 },
          pages: { type: 'number', required: true, minimum: 1 },
          page: { type: 'number', required: true, minimum: 1 },
          count: { type: 'number', required: true },
          list: { type: 'array', required: true,
            items: { type: 'object',
              properties: {
                id: { type: 'number', required: true, minimum: 1 },
                name: { type: 'string', required: true, minLength: 1 },
                body: { type: 'string', required: true, minLength: 1 },
                updatedAt: { type: 'string', required: true },
                createdAt: { type: 'string', required: true },
                status: { type: 'string', required: true,
                  enum: ['open', 'closed']
                }
              }
            }
          }
        }
      };

      _.assign(attributes, body);
      yield Bikeshed.destroy();
      yield _.times(30, function (n) {
        attributes.name = 'bikeshed ' + n;
        attributes.status = ['incomplete', 'open', 'closed'][n % 3];
        return Bikeshed.create(attributes, {validate: false});
      });
    });

    it('returns expected schema', function* () {
      res = yield request.get(url);
      expect(res.body).to.be.jsonSchema(schema);
    });

    it('sets defaults', function* () {
      res = yield request.get(url);
      _.forIn({
        page: 1, pages: 2, per: 12, count: 20, sortBy: 'id', direction: 'DESC'
      }, function (value, key) {
        expect(res.body[key]).to.equal(value);
      });
      expect(res.body.list).to.be.an('array').with.length(12);
      _.pluck(res.body.list, 'id').sort().reverse().forEach(function (id) {
        expect(id).to.equal(res.body.list.shift().id);
      });
    });

    it('paginates', function* () {
      res = yield request.get(url).query({page: 2});
      expect(res.body).to.be.jsonSchema(schema);
      expect(res.body.page).to.equal(2);
      expect(res.body.list).to.be.an('array').with.length(8);
    });

    it('allows changing per page value', function* () {
      res = yield request.get(url).query({per: 1});
      expect(res.body.page).to.equal(1);
      expect(res.body.pages).to.equal(20);
      expect(res.body.list).to.be.an('array').with.length(1);
    });

    it('allows ASC sorting by name field', function* () {
      res = yield request.get(url).query({direction: 'ASC', sortBy: 'name'});
      _.pluck(res.body.list, 'name').sort().forEach(function (name) {
        expect(name).to.equal(res.body.list.shift().name);
      });
    });

  });

  // create
  describe('POST /api/bikesheds', function () {
    beforeEach(function () {
      url = '/api/bikesheds';
      schema = {
        title: 'POST /api/bikesheds response',
        type: 'object',
        properties: {
          id: { type: 'number', required: true, minimum: 1 },
          name: { type: 'string', required: true, minLength: 1 },
          body: { type: 'string', required: true, minLength: 1 },
          updatedAt: { type: 'string', required: true },
          createdAt: { type: 'string', required: true },
          status: { type: 'string', required: true,
            enum: ['incomplete', 'open', 'closed']
          },
        }
      };
    });

    it('creates and returns a bikeshed', function* () {
      res = yield request.post(url).set(headers).send(body).expect(201);
      expect(res.body).to.be.jsonSchema(schema);
    });

    it('returns 400 on empty body', function* () {
      yield request.post(url).set(headers).send().expect(400, 'empty body');
      yield request.post(url).set(headers).expect(400, 'empty body');
    });

    it('returns 422 when invalid', function* () {
      yield request.post(url).set(headers).send({}).expect(422);
    });

    it('returns 401 when not authorized', function* () {
      headers = helper.buildHeaders();
      yield request.post(url).set(headers).expect(401);
    });

    it('returns 403 when csrf fails', function* () {
      yield request.post(url).expect(403);
    });

  });

  // show
  describe('GET /api/bikesheds/:bikeshed', function () {

    beforeEach(function* () {
      url = _.template('/api/bikesheds/<%=bikeshed%>');
      schema = {
        title: 'GET /api/bikesheds/:bikeshed response',
        type: 'object',
        properties: {
          id: { type: 'number', required: true },
          name: { type: 'string', required: true },
          body: { type: 'string', required: true },
          status: { type: 'string', required: true,
            enum: ['incomplete', 'open', 'closed']
          }
        }
      };
      attributes = _.assign(attributes, body);
      bikeshed = yield Bikeshed.create(attributes);
    });

    it('returns a bikeshed', function* () {
      url = url({bikeshed: bikeshed.id});
      res = yield request.get(url).expect(200);
      expect(res.body).to.be.jsonSchema(schema);
    });

    it('returns 404 when not found', function* () {
      url = url({bikeshed: 0});
      yield request.get(url).expect(404);
    });
  });

  // add
  describe('POST /api/bikesheds/:bikeshed', function () {
    beforeEach(function* () {
      url = _.template('/api/bikesheds/<%=bikeshed%>');
      schema = {
        title: 'POST /api/bikesheds/:bikeshed response',
        type: 'object',
        properties: {
          id: { type: 'number', required: true },
          name: { type: 'string', required: true },
          body: { type: 'string', required: true },
          score: { type: 'number', required: true },
          imageName: { type: ['string', 'null'], required: true },
          imageType: { type: ['string', 'null'], required: true }
        }
      };
      attributes = _.assign(attributes, body);
      bikeshed = yield Bikeshed.create(attributes);
      body = {name: 'bike', body: 'description'};
      url = url({bikeshed: bikeshed.id});
    });

    it('allows you to add a bike without image', function* () {
      res = yield request.post(url).set(headers).send(body).expect(201);
      expect(res.body).to.be.jsonSchema(schema);
    });

    it('allows you to add a bike with image', function* () {
      res = yield request.post(url).set(headers)
        .field('name', 'bike').field('body', 'description')
        .attach('image', jpgPath).expect(201);
      expect(res.body).to.be.jsonSchema(schema);
    });

    it('returns 400 on empty body', function* () {
      yield request.post(url).set(headers).send().expect(400, 'empty body');
      yield request.post(url).set(headers).expect(400, 'empty body');
    });

    it('returns 403 when at limit', function* () {
      body.BikeshedId = bikeshed.id;
      yield _.times(5, function () {
        return Bike.create(body);
      });

      yield request.post(url).set(headers)
        .field('name', 'bike').field('body', 'description')
        .attach('image', jpgPath).expect(403);
    });

    it('returns 403 when not incomplete', function* () {
      var statuses = ['open', 'closed'];
      while (statuses.length) {
        bikeshed.status = statuses.shift();
        yield bikeshed.save({validate: false});
        yield request.post(url).set(headers).attach('image', jpgPath).expect(403);
      }
    });

    it('returns 404 when not owner', function* () {
      bikeshed.UserId = 0;
      yield bikeshed.save();
      yield request.post(url).set(headers).expect(404);
    });

    it('returns 409 on conflicts', function* () {
      res = (yield _.times(10, function () {
        return request.post(url).set(headers)
          .field('name', 'bike').field('body', 'description')
          .attach('image', jpgPath);
      }));

      var count = _.countBy(res, 'statusCode');
      expect(count[201]).to.satisfy(function (num) {
        return num <= 5;
      });
      expect(count[409]).to.satisfy(function (num) {
        return num > 0;
      });
    });

    it('returns 415 on invalid file format', function* () {
      yield request.post(url).set(headers)
        .field('name', 'bike').field('body', 'description')
        .attach('image', svgPath).expect(415);
    });
  });

  // patch
  describe('PATCH /api/biksheds/:bikeshed', function () {
    beforeEach(function* () {
      url = _.template('/api/bikesheds/<%=bikeshed%>');
      attributes = _.assign(attributes, body);
      bikeshed = yield Bikeshed.create(attributes);
      body = {name: 'name', body: 'body', BikeshedId: bikeshed.id};
      url = url({bikeshed: bikeshed.id});
    });

    it('should let you update name and body', function* () {
      res = yield request.patch(url).set(headers).send({name: 'name', body: 'body'}).expect(200);
      bikeshed = yield Bikeshed.find(bikeshed.id);
      expect(bikeshed.name).to.equal('name');
      expect(bikeshed.body).to.equal('body');
    });

    it('should not let you update name and body when open', function* () {
      yield bikeshed.updateAttributes({status: 'open'}, {validate: false});
      yield request.patch(url).set(headers).send({name: 'name', body: 'body'}).expect(422);
    });

    it('should let you open bikeshed with two bikes', function* () {
      yield _.times(2, () => Bike.create(body));
      yield request.patch(url).set(headers).send({status: 'open'}).expect(200);
    });

    it('should not let you open bikeshed with zero bikes', function* () {
      yield request.patch(url).set(headers).send({status: 'open'}).expect(422);
    });

    it('should not let you open bikeshed with one bike', function* () {
      yield Bike.create(body);
      yield request.patch(url).set(headers).send({status: 'open'}).expect(422);
    });

    it('should let you open and then close bikesheds', function* () {
      yield _.times(2, () => Bike.create(body));
      yield request.patch(url).set(headers).send({status: 'open'}).expect(200);
      yield request.patch(url).set(headers).send({status: 'closed'}).expect(200);
    });

    it('should not let you close an incomplete bikeshed', function* () {
      yield _.times(2, () => Bike.create(body));
      yield request.patch(url).set(headers).send({status: 'closed'}).expect(422);
    });

    it('should not let you transition to an invalid state', function* () {
      yield bikeshed.updateAttributes({status: 'closed'}, {validate: false});
      yield request.patch(url).set(headers).send({status: 'incomplete'}).expect(422);
      yield request.patch(url).set(headers).send({status: 'open'}).expect(422);
    });

    it('responds with 400 to empty body', function* () {
      yield request.patch(url).set(headers).expect(400);
    });

    it('responds with 422 to invalid update', function* () {
      yield request.patch(url).set(headers).send({name: ''}).expect(422);
      yield request.patch(url).set(headers).send({body: ''}).expect(422);
      yield request.patch(url).set(headers).send({name: '', body: ''}).expect(422);
    });

  });

  // destroy
  describe('DELETE /api/bikesheds/:bikeshed', function () {
    beforeEach(function* () {
      url = _.template('/api/bikesheds/<%=bikeshed%>');
      attributes = _.assign(attributes, body);
      bikeshed = yield Bikeshed.create(attributes);
      url = url({bikeshed: bikeshed.id});
    });

    it('should allow deleting incomplete bikesheds', function* () {
      yield request.del(url).set(headers).expect(204);
    });

    it('should allow deleting open bikesheds', function* () {
      yield bikeshed.updateAttributes({status: 'open'}, {validate: false});
      yield request.del(url).set(headers).expect(204);
    });

    it('should allow deleting closed bikesheds', function* () {
      yield bikeshed.updateAttributes({status: 'closed'}, {validate: false});
      yield request.del(url).set(headers).expect(204);
    });

    it('should not allow deleting non-owned bikesheds', function* () {
      yield bikeshed.updateAttributes({UserId: user.id + 1});
      yield request.del(url).set(headers).expect(404);
    });

  });

  // score
  // TODO: add schema
  describe('GET /api/bikesheds/:bikeshed/bikes', function () {
    beforeEach(function* () {
      url = _.template('/api/bikesheds/<%=bikeshed%>/bikes');
      attributes = _.assign(attributes, body);
      bikeshed = yield Bikeshed.create(attributes);
      url = url({bikeshed: bikeshed.id});
      bikesIndex = {};
      BikeshedId = bikeshed.id;
      UserId = user.id;
      bikes = yield _.times(5, n =>
        Bike.create({name: `name ${n}`, body: `body ${n}`, BikeshedId})
      );
      yield bikeshed.updateAttributes({status: 'open'}, {validate: false});
      votes = yield bikes.map(bike => bike.id)
        .map((BikeId, value) => Vote.create({UserId, BikeshedId, BikeId, value}));
    });

    it('returns 200 without session', function* () {
      res = yield request.get(url).expect(200);
    });

    it('returns bikes list', function* () {
      bikes.forEach((bike, value) => bikesIndex[bike.id] = value);
      res = yield request.get(url).set(headers).expect(200);
      res.body.forEach(bike => expect(bike.score).to.equal(bikesIndex[bike.id]));
    });

    it('gets updated when someone votes', function* () {
      bikes.forEach((bike, value) => bikesIndex[bike.id] = value);
      res = yield request.get(url).set(headers).expect(200);
      res.body.forEach(bike => expect(bike.score).to.equal(bikesIndex[bike.id]));

      UserId = (yield User.create()).id;
      yield bikes.map(bike => bike.id)
        .map((BikeId, value) => Vote.create({UserId, BikeshedId, BikeId, value}));
      bikes.forEach((bike, value) => bikesIndex[bike.id] = value * 2);
      res = yield request.get(url).set(headers).expect(200);
      res.body.forEach(bike => expect(bike.score).to.equal(bikesIndex[bike.id]));
    });

  });

  // rate
  // TODO: add schema
  describe('POST /api/bikesheds/:bikeshed/bikes', function () {
    beforeEach(function* () {
      url = _.template('/api/bikesheds/<%=bikeshed%>/bikes');
      attributes = _.assign(attributes, body);
      bikeshed = yield Bikeshed.create(attributes);
      url = url({bikeshed: bikeshed.id});
      body = {};
      BikeshedId = bikeshed.id;
      UserId = user.id;
      bikes = yield _.times(5, n =>
        Bike.create({name: `name ${n}`, body: `body ${n}`, BikeshedId})
      );
      yield bikeshed.updateAttributes({status: 'open'}, {validate: false});
    });

    it('allows you to vote on bikes', function* () {
      bikes.forEach((bike, value) => body[bike.id] = {value});
      yield request.post(url).set(headers).send(body).expect(201);
    });

    it('allows multiple users to vote at the same time', function* () {
      bikes.forEach((bike, value) => body[bike.id] = {value});
      yield (yield _.times(5, () => User.create()))
        .map(user => helper.buildHeaders({user: {id: user.id}}))
        .map(headers => request.post(url).set(headers).send(body).expect(201));
    });

    it('returns 422 if you repeat value', function* () {
      bikes.forEach((bike, value) => body[bike.id] = {value});
      body[bikes[0].id].value = body[bikes[1].id].value;
      yield request.post(url).set(headers).send(body)
        .expect(422, 'must have unique value per bike');
    });

    it('returns 422 if you send invalid key', function* () {
      body = {bike: {value: 0}};
      bikes.forEach((bike, value) => body[bike.id] = {value});
      delete body[bikes[0].id];
      yield request.post(url).set(headers).send(body).expect(422, 'must vote on bikes');
    });

    it('returns 422 if bikes and votes length do not match', function* () {
      bikes.forEach((bike, value) => body[bike.id] = {value});
      delete body[bikes[0].id];
      yield request.post(url).set(headers).send(body).expect(422, 'must vote for each bike');

      body = {0: {value: 0}};
      bikes.forEach((bike, value) => body[bike.id] = {value});
      yield request.post(url).set(headers).send(body).expect(422, 'must vote for each bike');
    });

    it('returns 400 on empty body', function* () {
      yield request.post(url).set(headers).send().expect(400, 'empty body');
      yield request.post(url).set(headers).expect(400, 'empty body');
    });

    it('returns 403 when you have already voted', function* () {
      yield bikes.map((bike, value) => Vote.create({BikeId: bike.id, BikeshedId, UserId, value}));
      yield request.post(url).set(headers).send({}).expect(403, 'already voted');
    });

    it('returns 403 when bikeshed is not open', function* () {
      yield bikeshed.updateAttributes({status: 'closed'}, {validate: false});
      yield request.post(url).set(headers).send({}).expect(403, 'bikeshed must be open');

      yield bikeshed.updateAttributes({status: 'incomplete'}, {validate: false});
      yield request.post(url).set(headers).send({}).expect(403, 'bikeshed must be open');
    });

  });

  // change
  // TODO: add schema
  describe('PUT /api//bikesheds/:bikeshed/bikes', function () {
    beforeEach(function* () {
      url = _.template('/api/bikesheds/<%=bikeshed%>/bikes');
      attributes = _.assign(attributes, body);
      bikeshed = yield Bikeshed.create(attributes);
      url = url({bikeshed: bikeshed.id});
      body = {};
      BikeshedId = bikeshed.id;
      UserId = user.id;
      bikes = yield _.times(5, n => Bike.create({name: `${n}`, body: `${n}`, BikeshedId}));
      yield bikeshed.updateAttributes({status: 'open'}, {validate: false});
      votes = yield bikes.map(bike => bike.id)
        .map((BikeId, value) => Vote.create({UserId, BikeshedId, BikeId, value}));
      bikes = yield bikes.map(bike => bike.reload());
    });

    it('should let you update votes', function* () {
      bikes.forEach((bike, value) => expect(bike.score).to.equal(value));
      bikes.forEach((bike, value) => body[bike.id] = {value: bikes.length - value - 1});
      yield request.put(url).set(headers).send(body).expect(200);
      bikes = yield bikes.map(bike => bike.reload());
      bikes.forEach((bike, value) => expect(bike.score).to.equal(bikes.length - value - 1));
    });

    it('returns 422 when you send more votes', function* () {
      body[0] = {value: 0};
      bikes.forEach((bike, value) => body[bike.id] = {value});
      yield request.put(url).set(headers).send(body).expect(422, 'must vote on bikeshed bikes');
    });

    it('returns 422 when you fail to vote on all bikes', function* () {
      bikes.forEach((bike, value) => body[bike.id - 1] = {value});
      yield request.put(url).set(headers).send(body).expect(422, 'must vote on each bike');
    });

    it('returns 422 when you give invalid values', function* () {
      bikes.forEach((bike, value) => body[bike.id] = {value: bikes.length - value});
      yield request.put(url).set(headers).send(body).expect(422, 'must use unique value per bike');
    });

    it('returns 400 on empty body', function* () {
      yield request.put(url).set(headers).send().expect(400, 'empty body');
      yield request.put(url).set(headers).expect(400, 'empty body');
    });

    it('returns 403 when bikeshed is not open', function* () {
      yield bikeshed.updateAttributes({status: 'closed'}, {validate: false});
      yield request.put(url).set(headers).send({}).expect(403, 'bikeshed must be open');

      yield bikeshed.updateAttributes({status: 'incomplete'}, {validate: false});
      yield request.put(url).set(headers).send({}).expect(403, 'bikeshed must be open');
    });

    it('returns 403 when you have not voted', function* () {
      yield votes.map(vote => vote.destroy());
      yield request.put(url).set(headers).send({}).expect(403, 'must vote first');
    });

  });

  describe('GET /api/bikesheds/:bikeshed/bikes/votes', function () {
    beforeEach(function* () {
      url = _.template('/api/bikesheds/<%=bikeshed%>/bikes/votes');
      attributes = _.assign(attributes, body);
      bikeshed = yield Bikeshed.create(attributes);
      url = url({bikeshed: bikeshed.id});
      bikesIndex = {};
      BikeshedId = bikeshed.id;
      UserId = user.id;
      bikes = yield _.times(5, n => Bike.create({name: `${n}`, body: `${n}`, BikeshedId}));
      yield bikeshed.updateAttributes({status: 'open'}, {validate: false});
      votes = yield bikes.map(bike => bike.id)
        .map((BikeId, value) => Vote.create({UserId, BikeshedId, BikeId, value}));
    });

    it('shows your votes when logged in', function* () {
      bikes.forEach((bike, value) => bikesIndex[bike.id] = value);
      res = yield request.get(url).set(headers);
      expect(_.size(res.body)).to.equal(bikes.length);
      _.pairs(res.body).forEach((pair) => {
        expect(pair[1].value).to.equal(bikesIndex[pair[0]]);
      });
    });

    it('does not allow you to view other votes when logged out', function* () {
      yield request.get(url).expect(401);
    });

    it('does not allow you to view other votes when logged in', function* () {
      user = yield User.create();
      headers = helper.buildHeaders({user: {id: user.id}});
      res = request.get(url).set(headers);
      expect(_.size(res.body)).to.equal(0);
    });

  });

  // TODO: add trigger to make this work
  // // remove
  // describe('DELETE /api/biksheds/:bikeshed/bikes/:bike', function () {
  // });

});
