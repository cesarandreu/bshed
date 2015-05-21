const Router = require('koa-router')
const middleware = require('../../utils/middleware')

module.exports = UsersController
function UsersController () {
  const auth = middleware.authenticate()
  const routes = new Router()
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
  this.body = this.state.user
}
