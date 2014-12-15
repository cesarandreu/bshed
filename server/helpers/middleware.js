'use strict';

var jwt = require('koa-jwt');

// helpers~
module.exports = {

  // Resource is model, will search for param :resource and set to ctx.state.resource
  // Example: Bikeshed is the model, bikeshed is the param, ctx.state.bikeshed
  loadResource: function loadResource (resource) {
    var instanceName = resource.toLowerCase();
    return function* (next) {
      var param = this.params[instanceName];
      if (param) {
        this.state[instanceName] = yield this.models[resource].find(param);
      }
      if (!this.state[instanceName]) {
        this.throw(404, instanceName + ' not found');
      }
      yield next;
    };
  },

  // TODO: create a loadAndAuthorizeResource(ModelName) thing~

  // Checks authorization header or token query param
  // Moves token query param to authorization header
  auth: function auth (opts) {
    opts = opts || {};
    return function* authorize (next) {
      if (this.query.token) {
        this.header.authorization = 'Bearer ' + this.query.token;
      }
      opts.key = opts.key || 'decodedToken';
      opts.secret = opts.secret || this.app.config.secret;
      opts.passthrough = opts.passthrough || false;
      yield jwt(opts).call(this, noop);
      yield next;
    };
  },

  // Find user, set to ctx.state.user
  loadUser: function* loadUser (next) {
    try {
      this.state.user = yield this.models.User.find(this.decodedToken.id);
    } catch (err) {
      this.throw(404);
    }
    if (!this.state.user) {
      this.throw(404, 'user not found');
    }
    yield next;
  }
};

// private~
function* noop () {}
