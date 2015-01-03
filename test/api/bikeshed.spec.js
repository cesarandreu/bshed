'use strict';

var path = require('path'),
  qs = require('querystring'),
  _ = require('lodash');

var helper = require('./helper'),
  request = helper.request,
  models = helper.models;

var Bikeshed = models.Bikeshed,
  User = models.User,
  Image = models.Image,
  Vote = models.Vote;

var bikeshed, user, imagePath, headers, url, res, req, image, images, body, votes;

describe('Request:Bikeshed', function () {

  beforeEach(function* () {
    user = yield User.create({
      name: 'Bob',
      email: 'bob@example.com'
    });
    headers = helper.buildHeaders({user: {id: user.id}});
  });

  // index
  describe('GET /api/bikesheds', function () {

    beforeEach(function* () {
      url = '/api/bikesheds?';
      yield Bikeshed.destroy();
      yield _.times(30, function (n) {
        return Bikeshed.create({
          title: 'Bikeshed #' + n,
          UserId: user.id,
          published: n % 2 === 0,
          publishedAt: n % 2 === 0 ? new Date() : null
        });
      });

    });

    it('returns bikesheds, count, direction, page, pages, per, and sortBy', function* () {
      res = yield request.get(url);
      body = res.body;
      expect(body).to.be.an('object');
      expect(body.page).to.equal(1);
      expect(body.pages).to.equal(2);
      expect(body.per).to.equal(12);
      expect(body.count).to.equal(15);
      expect(body.sortBy).to.equal('id');
      expect(body.direction).to.equal('desc');
      expect(body.bikesheds).to.be.an('array').with.length(12);
      _.pluck(body.bikesheds, 'id').sort().reverse()
      .forEach(function (id) {
        expect(id).to.equal(body.bikesheds.shift().id);
      });
    });

    it('allows paginating', function* () {
      res = yield request.get(url+qs.stringify({page: 2}));
      body = res.body;
      expect(body).to.be.an('object');
      expect(body.page).to.equal(2);
      expect(body.bikesheds).to.be.an('array').with.length(3);
    });

    it('allows changing bikesheds per page', function* () {
      res = yield request.get(url+qs.stringify({per: 1}));
      body = res.body;
      expect(body).to.be.an('object');
      expect(body.page).to.equal(1);
      expect(body.pages).to.equal(15);
      expect(body.bikesheds).to.be.an('array').with.length(1);
    });

    it('allows ascending sorting by title column', function* () {
      res = yield request.get(url+qs.stringify({sortBy: 'title', direction: 'asc'}));
      body = res.body;
      _.pluck(body.bikesheds, 'title').sort()
      .forEach(function (title) {
        expect(title).to.equal(body.bikesheds.shift().title);
      });
    });

  });

  // create
  describe('POST /api/bikesheds', function () {
    beforeEach(function () {
      url = '/api/bikesheds';
      body = {title: 'the bikeshed is red'};
    });

    it('creates and returns a bikeshed', function* () {
      res = yield request.post(url).set(headers).send(body).expect(201);
      expect(res.body).to.be.an('object').and.to.have.keys(Bikeshed.jsonAttributes);
    });

    it('returns 422 when invalid', function* () {
      yield request.post(url).send({}).set(headers).expect(422);
      yield request.post(url).send().set(headers).expect(422);
      yield request.post(url).set(headers).expect(422);
    });

    it('returns 401 when not authorized', function* () {
      yield request.post(url).send().expect(401);
    });

  });

  // show
  describe('GET /api/bikesheds/:bikeshed', function () {
    beforeEach(function* () {
      bikeshed = yield Bikeshed.create({
        title: 'bikeshed',
        UserId: user.id
      });
      url = _.template('/api/bikesheds/<%=bikeshed%>')({bikeshed: bikeshed.id});
    });

    it('returns a bikeshed', function* () {
      var keys = Bikeshed.jsonAttributes;
      res = yield request.get(url).expect(200);
      expect(res.body).to.be.an('object').and.to.have.keys(keys);
    });

    it('returns 404 when not found', function* () {
      yield request.get(url.replace(bikeshed.id, 0)).expect(404);
    });

  });

  // upload
  describe('POST /api/bikesheds/:bikeshed', function () {
    beforeEach(function* () {
      bikeshed = yield Bikeshed.create({
        title: 'bikeshed',
        UserId: user.id
      });
      imagePath = path.join(helper.fixtures, 'puppy_01.jpg');
      url = _.template('/api/bikesheds/<%=bikeshed%>')({bikeshed: bikeshed.id});
    });

    it('allows you to upload an image', function* () {
      yield request
        .post(url)
        .set(headers)
        .attach('image0', imagePath)
        .attach('image1', imagePath)
        .expect(201);
    });

    it('returns image information on success', function* () {
      res = yield request
        .post(url)
        .set(headers)
        .attach('image0', imagePath)
        .attach('image1', imagePath);

      expect(res.body).to.be.an('array').and.have.length(2);
      res.body.forEach(function (img) {
        expect(img).to.be.an('object');
        expect(img.id).to.be.a('number');
        expect(img.path).to.be.a('string');
        expect(img.type).to.be.a('string');
        expect(img.BikeshedId).to.be.a('number').and.equal(bikeshed.id);
      });
    });

    it('should be published after submitting', function* () {
      expect(bikeshed.published).to.equal(false);
      yield request
        .post(url)
        .set(headers)
        .attach('image0', imagePath)
        .attach('image1', imagePath);

      bikeshed = yield bikeshed.reload();
      expect(bikeshed.published).to.equal(true);
    });

    it('returns 409 on conflict', function* () {
      res = (yield _.times(2, function () {
        return request.post(url).set(headers)
          .attach('image0', imagePath).attach('image1', imagePath);
      })).map(function (r) { return r.statusCode; });
      expect(res).to.contain.members([409, 201]);
    });

    it('returns 403 when published', function* () {
      bikeshed.published = true;
      yield bikeshed.save();
      yield request.post(url)
        .set(headers)
        .attach('bikeshed', imagePath)
        .expect(403, 'must be unpublished and owned by current user');
    });

    it('returns 403 when not owner', function* () {
      bikeshed.UserId = 0;
      yield bikeshed.save();
      yield request.post(url)
        .set(headers)
        .attach('bikeshed', imagePath)
        .expect(403, 'must be unpublished and owned by current user');
    });

    it('returns 422 when there\'s no files', function* () {
      yield request
        .post(url)
        .set(headers)
        .expect(422, 'must have at least two files');
    });

    it('returns 422 when there\'s only one file', function* () {
      yield request
        .post(url)
        .set(headers)
        .attach('image', imagePath)
        .expect(422, 'must have at least two files');
    });

    it('returns 422 when there\'s over ten files', function* () {

      req = request.post(url).set(headers);
      _.times(11, function (n) {
        req.attach('image'+n, imagePath);
      });
      yield req.expect(422, 'cannot have over ten files');
    });

    it('returns 422 on invalid file format', function* () {
      yield request
        .post(url)
        .set(headers)
        .attach('image0', path.join(helper.fixtures, 'invalid.svg'))
        .attach('image1', path.join(helper.fixtures, 'invalid.svg'))
        .expect(422);
    });

  });

  // vote
  describe('POST /api/bikesheds/:bikeshed/votes', function () {
    beforeEach(function* () {
      bikeshed = yield Bikeshed.create({
        title: 'bikeshed',
        UserId: user.id,
        published: true,
        publishedAt: new Date()
      });

      imagePath = path.join(helper.fixtures, 'puppy_01.jpg');
      image = {
        BikeshedId: bikeshed.id,
        type: 'image/png',
        path: imagePath
      };
      images = yield Image.bulkCreateAndUpload([image, image]);

      url = _.template('/api/bikesheds/<%=bikeshed%>/votes')({bikeshed: bikeshed.id});
      body = {votes: {}};
      _.times(images.length, function (n) {
        body.votes[images[n].id] = n;
      });
    });

    it('returns votes on success', function* () {
      res = yield request.post(url).set(headers).send(body);
      res.body.forEach(function (vote) {
        expect(vote).to.be.an('object');
        expect(vote.BikeshedId).to.equal(bikeshed.id);
        expect(vote.UserId).to.equal(user.id);
        expect(vote.value).to.equal(body.votes[vote.ImageId]);
      });
    });

    it('returns 201 on success', function* () {
      yield request.post(url).set(headers).send(body).expect(201);
    });

    it('returns 409 when there are conflicts', function* () {
      res = (yield _.times(2, function () {
        return request.post(url).set(headers).send(body);
      })).map(function (r) { return r.statusCode; });
      expect(res).to.contain.members([201, 409]);
    });

    it('returns 422 when you vote on invalid images', function* () {
      body.votes = {};
      _.times(images.length, function (n) { body.votes[n] = n; });
      yield request.post(url).set(headers).send(body)
        .expect(422, 'must vote on all images');
    });

    it('returns 422 when you send repeated vote values', function* () {
      images.forEach(function (image) { body.votes[image.id] = 0; });
      yield request.post(url).set(headers).send(body)
        .expect(422, 'must have unique value per image');
    });

    it('returns 422 when you send invalid request', function* () {
      yield request.post(url).set(headers).send({})
        .expect(422, 'body must submit votes');
      yield request.post(url).set(headers)
        .expect(422, 'body must submit votes');
    });

    it('returns 403 if you\'ve already voted', function* () {
      yield _.times(images.length, function (n) {
        return Vote.create({
          BikeshedId: bikeshed.id, UserId: user.id,
          ImageId: images[n].id, value: n
        });
      });
      yield request.post(url).set(headers).send(body)
        .expect(403, 'you already voted');
    });

    it('returns 403 when bikeshed is unpublished', function* () {
      bikeshed.published = false;
      yield bikeshed.save();
      yield request.post(url).set(headers).send(body)
        .expect(403, 'bikeshed must be published');
    });

  });

  describe('GET /api/bikesheds/:bikeshed/votes', function () {
    beforeEach(function* () {
      bikeshed = yield Bikeshed.create({
        title: 'bikeshed',
        UserId: user.id,
        published: true,
        publishedAt: new Date()
      });
      imagePath = path.join(helper.fixtures, 'puppy_01.jpg');
      image = {
        BikeshedId: bikeshed.id,
        type: 'image/png',
        path: imagePath
      };
      images = yield Image.bulkCreateAndUpload([image, image, image]);
      votes = yield images.map(function (image, idx) {
        return Vote.create({
          value: idx,
          BikeshedId: bikeshed.id,
          UserId: user.id,
          ImageId: image.id
        });
      });

      url = _.template('/api/bikesheds/<%=bikeshed%>/votes')({bikeshed: bikeshed.id});
    });

    it('returns images and their scores', function* () {
      let map = {};
      res = yield request.get(url);
      res.body.forEach(function (image) {
        map[image.id] = image.score;
      });
      for (let ImageId in map) {
        let score = yield Vote.sum('value', {where: {ImageId: ImageId}});
        expect(score).to.equal(map[ImageId]);
      }
    });

    it('returns 200 when bikeshed is found', function* () {
      yield request.get(url).expect(200);
    });

    it('returns 404 if bikeshed is not found', function* () {
      yield request.get(url.replace(bikeshed.id, 0)).expect(404);
    });

  });

  describe('DELETE /api/bikesheds/:bikeshed', function () {
    beforeEach(function* () {
      bikeshed = yield Bikeshed.create({
        title: 'bikeshed',
        UserId: user.id
      });
      url = _.template('/api/bikesheds/<%=bikeshed%>');
    });

    it('should be soft deleted on success', function* () {
      yield request.del(url({bikeshed: bikeshed.id})).set(headers);
      expect(yield Bikeshed.find(bikeshed.id)).to.equal(null);
    });

    it('returns 204 when it\'s successful', function* () {
      yield request.del(url({bikeshed: bikeshed.id})).set(headers).expect(204);
    });

    it('returns 403 when not the owner', function* () {
      bikeshed = yield Bikeshed.create({
        title: 'bikeshed',
        UserId: user.id + 1
      });
      yield request.del(url({bikeshed: bikeshed.id})).set(headers)
        .expect(403, 'must be owner to delete bikeshed');
    });

  });

});
