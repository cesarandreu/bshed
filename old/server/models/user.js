/**
 * User model
 */
import Joi from 'joi'
import BaseModel from './model'

const UserSchema = Joi.object()
.keys({
  createdAt: Joi.date(),
  id: Joi.string().guid(),
  name: Joi.string().max(256).default('').allow(''),
  email: Joi.string().email().default('').allow('')
})

const PROPS = {
  SCHEMA: UserSchema,
  INDEXES: [],
  TABLE: 'users',
  TYPE: 'User'
}

export default class User extends BaseModel {
}
Object.assign(User.prototype, PROPS)
