'use strict';

var _ = require('lodash'),
  uuid = require('node-uuid');

var Router = require('koa-router'),
  body = require('koa-better-body');

module.exports = function BikeshedsController (helpers) {
  var middleware = helpers.middleware,
    auth = middleware.auth(),
    loadBikeshed = middleware.load('Bikeshed'),
    authLoadBike = middleware.load('Bike', {parent: 'Bikeshed'}),
    authLoadBikeshed = middleware.load('Bikeshed', {parent: 'User'});

  var jsonBody = body(),
    multiBody = body({
      multipart: true,
      formidable: {
        multiples: false
      }
    });

  var bikeshedRoutes = new Router()

    // public
    .get('/bikesheds', index)
    .get('/bikesheds/:bikeshed', loadBikeshed, show)
    .get('/bikesheds/:bikeshed/bikes', loadBikeshed, score)

    // private
    .post('/bikesheds', auth, jsonBody, create)
    .put('/bikesheds/:bikeshed', auth, authLoadBikeshed, update)
    .del('/bikesheds/:bikeshed', auth, authLoadBikeshed, destroy)
    .post('/bikesheds/:bikeshed', auth, authLoadBikeshed, multiBody, add)
    .post('/bikesheds/:bikeshed/bikes', auth, loadBikeshed, jsonBody, rate)
    .put('/bikesheds/:bikeshed/bikes', auth, loadBikeshed, jsonBody, change)
    .del('/bikesheds/:bikeshed/bikes/:bike', auth, authLoadBikeshed, authLoadBike, remove);

  return bikeshedRoutes.middleware();
};

/**
 * GET /bikesheds
 * Public
 * Parameters: sortBy, direction, page, per
 *  per: default 12, [1..96]
 *  page: default 1, [1..]
 *  sortBy: default id, [id, name, createdAt, updatedAt]
 *  direction: default DESC, [DESC, ASC]
 */
function* index () {
  var Bikeshed = this.models.Bikeshed,
    query = this.request.query,
    page = _.parseInt(query.page),
    per = _.parseInt(query.per),
    sortBy = query.sortBy,
    direction = (query.direction || '').toUpperCase();

  page = page >= 1 ? page : 1;
  per = per >= 1 ? (per < 96 ? per : 96) : 12;
  direction = _.contains(['ASC', 'DESC'], direction) ? direction : 'DESC';
  sortBy = _.contains(['id', 'name', 'createdAt', 'updatedAt'], sortBy) ? sortBy : 'id';

  var result = yield Bikeshed.findAndCountAll({
    where: {status: {ne: 'incomplete'}},
    order: [[sortBy, direction]],
    offset: (page - 1) * per,
    limit: per
  });

  this.body = {
    list: result.rows,
    count: result.count,
    page: page,
    pages: Math.ceil(result.count / per) || 1,
    per: per,
    sortBy: sortBy,
    direction: direction
  };
}

/**
 * POST /bikesheds
 * Protected
 * Body: {name: string, body: string}
 */
function* create () {
  var fields = _.assign({UserId: this.state.user.id},
    _.pick(this.request.body.fields, ['name', 'body']));

  var bikeshed = this.models.Bikeshed.build(fields),
    bikeshedValidation = yield bikeshed.validate();
  if (bikeshedValidation) {
    this.body = bikeshedValidation;
    this.status = 422;
  } else {
    this.body = yield bikeshed.save();
    this.status = 201;
  }
}

/**
 * GET /bikesheds/:bikeshed
 * Public
 */
function* show () {
  this.body = this.state.bikeshed;
}

/**
 * POST /bikesheds/:bikeshed
 * Protected
 * Body: {name: string, body: string, image: file}
 */
function* add () {
  var bikeshed = this.state.bikeshed;
  if (bikeshed.status !== 'incomplete') {
    this.throw(403, 'can only add bikes to incomplete bikeshed');
  } else if (bikeshed.size >= 5) {
    this.throw(403, 'cannot insert over 5 bikes per bikeshed');
  }

  var image = _.values(this.request.body.files)[0],
    fields = _.assign({
      BikeshedId: this.state.bikeshed.id, imageType: image && image.type
    }, _.pick(this.request.body.fields, ['name', 'body']));

  var bike = this.models.Bike.build(fields),
    bikeValidation = yield bike.validate();
  if (bikeValidation) {
    this.body = bikeValidation;
    if (_.where(bikeValidation.errors, {path: 'imageType'})) {
      this.throw(415);
    } else {
      this.throw(422);
    }
  }

  var s3Options = {};
  if (image) {
    bike.imageName = uuid.v4();
    s3Options.upload = {
      localFile: image.path,
      s3Params: {
        ACL: 'public-read',
        ContentType: bike.imageType,
        Bucket: bike.bucket,
        Key: bike.key
      }
    };
    s3Options.destroy = {
      Delete: {Objects: [{Key: bike.key}]},
      Bucket: bike.bucket
    };
  }

  var t = yield this.models.sequelize.transaction();
  try {
    bike = yield bike.save({transaction: t});
    if (image) yield this.s3.attemptUpload(s3Options);
    yield t.commit();
  } catch (err) {
    yield t.rollback();
    if (err.message === 'cannot insert over 5 bikes per bikeshed') {
      this.throw(403, err.message);
    } else if (err.message === 'could not serialize access due to concurrent update') {
      this.throw(409, err.message);
    } else {
      this.throw(503);
    }
  }
  this.body = bike;
  this.status = 201;
}

/**
 * PUT /biksheds/:bikeshed
 * Protected
 * Body: {name: string, body: string, status: string}
 */
function* update () {
  var bikeshed = this.state.bikeshed,
    {name, body, status} = _.pick(this.request.body.fields, ['name', 'body', 'status']);

  if (name || body && bikeshed.status !== 'incomplete')
    this.throw(422, 'can only update name and body on incomplete bikeshed');

  if (bikeshed.status === 'incomplete') {
    if (name) bikeshed.name = name;
    if (body) bikeshed.body = body;
  }

  if (status) bikeshed.status = status;

  var validation = yield bikeshed.validate();
  if (validation) {
    this.body = validation;
    this.throw(422);
  }

  this.body = yield bikeshed.save();
  this.status = 200;
}

/**
 * DELETE /bikeshed/:bikeshed
 * Protected
 */
function* destroy () {
  yield this.state.bikeshed.destroy();
  this.status = 204;
}

/**
 * GET /bikesheds/:bikeshed/bikes
 * Public
 */
function* score () {
  this.body = yield this.models.Bikes.findAll({where: {BikeshedId: this.state.bikeshed.id}});
}

/**
 * POST /bikesheds/:bikeshed/bikes
 * Protected
 * Body: {[BikeId]: {score: number}}
 * Example: {1:{score:0}, 2:{score:1}, 3:{score:2}}
 */
function* rate () {
  var {Vote, Bike} = this.models, {bikeshed, user} = this.state;

  if (bikeshed.status !== 'open') {
    this.throw(403, 'bikeshed must be open');
  } else if (yield Vote.count({where: {BikeshedId: bikeshed.id, UserId: user.id}})) {
    this.throw(403, 'already voted');
  }

  var bikes = yield Bike.findAll({where: {BikeshedId: bikeshed.id}});
  var votes = _.pairs(this.request.body.fields)
  .map(function (pair) {
    var BikeId = _.parseInt(pair[0]), {score} = _.pick(pair[1], ['score']),
      BikeshedId = bikeshed.id, UserId = user.id;
    return Vote.build({BikeshedId, UserId, BikeId, score});
  });

  if (bikes.length !== votes.length) {
    this.throw(422, 'must vote for each bike');
  } else if (_.difference(_.pluck(votes, 'BikeId'), _.pluck(bikes, 'id')).length) {
    this.throw(422, 'can only vote once per bike');
  } else if (_.difference(_.pluck(votes, 'score'), _.range(votes.length)).length) {
    this.throw(422, 'must have unique score per bike');
  }

  var validations = yield votes.map(vote => vote.validate()).filter(vote => vote);
  if (validations.length) {
    this.body = validations;
    this.throw(422);
  }

  var t = yield this.models.sequelize.transaction();
  try {
    votes = yield votes.map(vote => vote.save({transaction: t}));
    yield t.commit();
  } catch (err) {
    yield t.rollback();
    this.throw(409, 'voting conflict');
  }

  this.body = votes;
  this.status = 201;
}

/**
 * PUT /bikesheds/:bikeshed/bikes
 * Protected
 * Body: {}
 */
function* change () {
  this.body = 503;
}

/**
 * DELETE /bikesheds/:bikeshed/bikes/:bike
 * Protected
 */
function* remove () {
  if (this.state.bikeshed.status !== 'incomplete') {
    this.throw(403, 'can only remove bikes from incomplete bikesheds');
  }

  yield this.state.bike.destroy();
  this.status = 204;
}
