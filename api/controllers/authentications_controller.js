const Joi = require('joi')
const Router = require('koa-router')
const bodyParser = require('koa-body')
const middleware = require('../../utils/middleware')

module.exports = AuthenticationsController
function AuthenticationsController () {

  // Middleware
  const parseJsonForm = bodyParser()
  const auth = middleware.authenticate()

  const checkLoginSchema = middleware.checkSchema(
    AuthenticationsController.login.schema
  )
  const checkRegisterSchema = middleware.checkSchema(
    AuthenticationsController.register.schema
  )

  // Routes
  const routes = new Router({
    prefix: '/auth'
  })
  .post(
    '/login',
    parseJsonForm,
    checkLoginSchema,
    AuthenticationsController.login
  )
  .post(
    '/register',
    auth,
    parseJsonForm,
    checkRegisterSchema,
    AuthenticationsController.register
  )
  .del(
    '/logout',
    AuthenticationsController.logout
  )

  return routes.middleware()
}

/**
 * POST /login
 */
AuthenticationsController.login = function* login () {
  const {body} = this.state
  const {User} = this.models

  // Find user
  const user = yield User.findOne({
    where: {
      email: body.email
    }
  })
  this.assert(user, 404, 'User not found')

  // Validate password
  const isValidPassword = yield user.checkPassword(body.password)
  this.assert(isValidPassword, 422, 'User password invalid')

  // Set session
  this.session.user = {
    id: user.id
  }

  this.body = user
}

/**
 * Login schema
 * Check validation on ctx.request.body.fields
 */
AuthenticationsController.login.schema = Joi.object().required().keys({
  email: Joi.string().min(1).max(255).required(),
  password: Joi.string().min(6).max(1000).required()
})

/**
 * POST /register
 */
AuthenticationsController.register = function* register () {
  const {body, user} = this.state
  const {User} = this.models
  this.assert(!user.registered, 403)

  this.body = yield user.update({
    hashedPassword: yield User.hashPassword(body.password),
    registeredAt: new Date(),
    email: body.email,
    name: body.name
  })
  this.status = 201
}

/**
 * Register schema
 * Check validation on ctx.request.body.fields
 */
AuthenticationsController.register.schema = Joi.object().required().keys({
  name: Joi.string().min(1).max(255).required(),
  password: Joi.string().min(6).max(1000).required(),
  email: Joi.string().min(1).max(254).email().required()
})

/**
 * DELETE /logout
 */
AuthenticationsController.logout = function* logout () {
  this.session = null
  this.status = 204
}
