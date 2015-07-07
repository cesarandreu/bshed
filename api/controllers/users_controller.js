import Router from 'koa-router'
import middleware from '../../utils/middleware'

/**
 * Users controller
 */
export default function UsersController () {

  // Middleware
  const auth = middleware.authenticate()

  // Routes
  const routes = new Router({
    prefix: '/api'
  })
  .get(
    '/users/current',
    auth,
    UsersController.current
  )

  return routes.middleware()
}

/**
 * GET /api/users/current
 * Returns current user model
 */
UsersController.current = function * current () {
  this.body = this.state.user
}
