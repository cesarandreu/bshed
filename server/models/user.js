/**
 * User model
 */
import createModel from './model'
import Joi from 'joi'

const UserBase = {
  INDEXES: {},

  SCHEMA: Joi.object({
    createdAt: Joi.date(),
    email: Joi.string().email().default('').allow(''),
    id: Joi.string().guid(),
    name: Joi.string().max(256).default('').allow(''),
    registeredAt: Joi.date(),
    updatedAt: Joi.date()
  }),

  TABLE: 'users',

  TYPE: 'User'
}

export default function createUser ({ r }) {
  const BaseModel = createModel({ r }, UserBase)
  const User = Object.create(BaseModel, {
  })
  return User
}

Object.assign(createUser, UserBase)
