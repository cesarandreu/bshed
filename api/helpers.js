'use strict';

var assert = require('assert'),
  wait = require('co-wait'),
  _ = require('lodash');

module.exports = {
  retry: retry,
  noop: noop,
  middleware: {
    load: load,
    auth: auth
  }
};

/**
 * retry
 * ripped off from co-retry
 */
function* retry (fn, opts={}) {
  var {attempts, interval, delta} = opts;
  attempts = attempts || 3;
  interval = interval || 500;
  delta = delta || 250;

  while (true) {
    try {
      return yield fn();
    } catch (err) {
      if (!(attempts--)) throw err;
      yield wait(_.random(interval - delta, interval + delta));
    }
  }
}

/**
 * load
 *
 * Searches for :name param using resource model and sets value to ctx.state[name]
 * Throws 404 if authorization or search fails
 *
 * param resource - model name
 * param opts.name - param value to use. default: resource.toLowerCase()
 * param opts.key - searching value to use. default: id
 * param opts.parent - include parent in where, like resource
 * param opts.parent.resource - model name
 * param opts.parent.name - param value to use. default: parent.resource.toLowerCase()
 * param opts.parent.through - association key to use. default: ${parent.resource}Id
 * param opts.parent.key - parent.use key to check. default: id
 *
 * example load('Bikeshed') - uses Bikeshed model, :bikeshed param, and sets ctx.state.bikeshed
 */
function load (resource, opts={}) {
  assert(resource);
  opts = _.assign({
    key: 'id',
    name: resource.toLowerCase()
  }, opts);

  if (opts.parent) {
    if (_.isString(opts.parent)) {
      opts.parent = {resource: opts.parent};
    }
    opts.parent = _.assign({
      name: opts.parent.resource.toLowerCase(),
      through: `${opts.parent.resource}Id`,
      key: 'id'
    }, opts.parent);
  }

  return function* loadMiddleware (next) {
    // inside of try-catch in case any key is incorrect
    try {
      var params = {
        where: {[opts.key]: this.params[opts.name]}
      };
      if (opts.parent) {
        params.where[opts.parent.through] = this.state[opts.parent.name][opts.parent.key];
      }

      this.state[opts.name] = yield this.models[resource].find(params);
      if (!this.state[opts.name]) throw new Error(resource + ' not found');
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

