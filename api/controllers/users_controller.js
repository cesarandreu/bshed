var Router = require('koa-router')
var middleware = require('../../utils/middleware')

module.exports = UsersController
function UsersController () {
  var auth = middleware.auth()
  var routes = new Router()
  .get(
    '/api/users/current',
    auth,
    UsersController.current
  )

  return routes.middleware()
}

/**
 * GET /users/current
 * Returns current user model
 */
UsersController.current = function* current () {
  var user = this.state.user.toJSON()
  delete user.hashedPassword
  this.body = user
}
