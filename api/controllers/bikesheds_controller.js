'use strict';

var _ = require('lodash'),
  uuid = require('node-uuid');

var Router = require('koa-router'),
  body = require('koa-better-body');

module.exports = function BikeshedsController (helpers) {
  var middleware = helpers.middleware,
    auth = middleware.auth(),
    authLoadBikeshed = middleware.load('Bikeshed'),
    loadBikeshed = middleware.load('Bikeshed', {auth: false});

  var jsonBody = body(),
    multipartBody = body({
      multipart: true,
      formidable: {
        multiples: false
      }
    });

  var bikeshedRoutes = new Router()

    // public
    .get('/bikesheds', index)
    .get('/bikesheds/:bikeshed', loadBikeshed, get)
    .get('/bikesheds/:bikeshed/votes', loadBikeshed, score)

    // private
    .post('/bikesheds', auth, jsonBody, create)
    .del('/bikesheds/:bikeshed', auth, authLoadBikeshed, destroy)
    .post('/bikesheds/:bikeshed', auth, authLoadBikeshed, multipartBody, add)
    .post('/bikesheds/:bikeshed/votes', auth, authLoadBikeshed, jsonBody, vote);

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
function* get () {
  this.body = this.state.bikeshed;
}

/**
 * GET /bikesheds/:bikeshed/votes
 * Public
 */
function* score () {
  var images = yield this.models.Image.findAll({where: {BikeshedId: this.state.bikeshed.id}});
  var result = [], image;
  for (var i = 0, len = images.length; i < len; i++) {
    image = images[i].toJSON();
    image.score = yield this.models.Vote.sum('value', {where: {ImageId: image.id}});
    result.push(image);
  }
  this.body = result;
}

/**
 * POST /bikesheds/:bikeshed
 * Protected
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
    if (image) {
      yield this.s3.attemptUpload(s3Options);
    }
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
  yield t.commit();
  this.body = bike;
  this.status = 201;
}

/**
 * POST /bikesheds/:bikeshed/votes
 * Protected
 * Body {votes: {ImageId: value}}
 * Example: {votes: {1: 0, 2: 1}}
 */
function* vote () {
  var Vote = this.models.Vote,
    Image = this.models.Image,
    User = this.models.User;

  var bikeshed = this.state.bikeshed,
    user = this.state.user;

  // bikeshed must be published
  if (!bikeshed.published) {
    this.throw(403, 'bikeshed must be published');
  }

  // cannot have already voted
  var voteCount = yield Vote.count({
    where: {BikeshedId: bikeshed.id, UserId: user.id}
  });
  if (voteCount) {
    this.throw(403, 'you already voted');
  }

  if (!this.request.body.fields || !this.request.body.fields.votes) {
    this.throw(422, 'body must submit votes');
  }

  var votes = this.request.body.fields.votes;
  var images = yield Image.findAll({
    where: {BikeshedId: bikeshed.id}
  });

  // check for repeated or incomplete values
  var voteValues = _.values(votes).sort(),
    imageCount = images.length;
  while (imageCount--) {
    if (voteValues[imageCount] !== imageCount) {
      this.throw(422, 'must have unique value per image');
    }
  }

  // check that all vote ImageIds match ImageIds
  var voteImageIds = _.keys(votes);
  var imageIds = _.map(images, function (image) {
    return image.id.toString();
  });
  if (_.difference(voteImageIds, imageIds).length) {
    this.throw(422, 'must vote on all images');
  }

  var userVotes = _.map(images, function (image) {
    return Vote.build({
      UserId: user.id,
      BikeshedId: bikeshed.id,
      ImageId: image.id,
      value: votes[image.id]
    });
  });

  // perform validation on all votes
  var validations = (yield userVotes.map(function (userVote) {
    return userVote.validate();
  })).filter(function (validation) {
    return validation;
  });
  if (validations.length) {
    this.status = 422;
    this.body = validations;
    return;
  }

  // TODO: make this safe~
  // TODO: add score to images and update here?
  var t = yield this.models.sequelize.transaction();
  try {
    user = yield User.find(user.id, {transaction: t, lock: t.LOCK.UPDATE});
    user = yield user.increment('timesVoted', {transaction: t});
    userVotes = yield userVotes.map(function (userVote) {
      return userVote.save({transaction: t});
    });
    if (this.state.user.timesVoted + 1 !== user.timesVoted) {
      throw new Error('voting conflict');
    }
  } catch (err) {
    yield t.rollback();
    this.throw(409, 'voting conflict');
  }
  yield t.commit();

  this.body = userVotes;
  this.status = 201;
}

/**
 * DELETE /bikeshed/:bikeshed
 * Protected
 */
function* destroy () {
  var bikeshed = this.state.bikeshed;
  if (bikeshed.UserId !== this.state.user.id) {
    this.throw(403, 'must be owner to delete bikeshed');
  }
  yield bikeshed.destroy();
  this.status = 204;
}
