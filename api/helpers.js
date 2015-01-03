'use strict';

var assert = require('assert'),
  _ = require('lodash');

module.exports = {
  noop: noop,
  middleware: {
    load: load,
    auth: auth
  }
};

/**
 * load
 *
 * Searches for :name param using resource model and sets value to ctx.state[name]
 * Throws 404 if authorization or search fails
 *
 * param resource - model name
 * param opts.name - param and state value to use. default: resource.toLowerCase()
 * param opts.auth - check instance UserId matches session user.id. default: true
 *
 * example load('Bikeshed') - uses Bikeshed model, :bikeshed param, and sets ctx.state.bikeshed
 */
function load (resource, opts) {
  assert(resource);
  opts = _.assign({
    name: resource.toLowerCase(),
    auth: true
  }, opts);

  var name = opts.name;
  return function* loadMiddleware (next) {
    try {
      var instance = this.state[name] = yield this.models[resource].find(this.params[name]);
      if (!instance || (opts.auth && instance.UserId !== this.session.user.id)) {
        throw new Error(resource + ' not found');
      }
    } catch (err) {
      this.throw(404, resource + ' not found');
    }
    yield next;
  };
}

/**
 * auth
 *
 * Loads user to ctx.state.user using session user.id
 * Throws 401 if session is not set or user isn't found
 */
function auth () {
  return function* authMiddleware (next) {
    try {
      this.state.user = yield this.models.User.find(this.session.user.id);
      if (!this.state.user) {
        throw new Error('user not found');
      }
    } catch (err) {
      this.throw(401);
    }
    yield next;
  };
}

// do nothing
function noop () {}

