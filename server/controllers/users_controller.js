'use strict';

var Router = require('koa-router');

module.exports = function UsersController (helpers) {
  var middleware = helpers.middleware,
    auth = middleware.auth(),
    passthroughAuth = middleware.auth({passthrough: true}),
    loadUser = middleware.loadUser;

  var userRoutes = new Router()
    .get('/users/current', auth, loadUser, current)
    .get('/users/renew', passthroughAuth, renew);

  return userRoutes.middleware();
};

/**
 * GET /users/current
 * Returns current user model
 */
function* current () {
  var user = this.state.user.toJSON();
  delete user.hashedPassword;
  this.body = user;
}

/**
 * GET /users/renew
 * Renews the user's token
 */
function* renew () {
  this.status(501);
}
