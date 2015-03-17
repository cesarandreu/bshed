var Router = require('koa-router'),
  assert = require('assert');

module.exports = function UsersController (helpers) {
  assert(helpers, 'UsersController requries helpers')

  var auth = helpers.middleware.auth();

  var userRoutes = new Router()
    .get('/users/current', auth, current);

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
