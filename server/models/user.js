/**
 * User model
 */
import Joi from 'joi'
import * as utils from './utils'

export const INDEXES = []
export const TABLE = 'users'
export const TYPE = 'User'

export const UserSchema = Joi.object().keys({
  createdAt: Joi.date(),
  id: Joi.string().guid(),
  name: Joi.string().max(256).default('').allow(''),
  email: Joi.string().email().default('').allow('')
})

export const validate = utils.createValidate(UserSchema)

export const get = utils.createGet(TABLE)

export async function create (r, values) {
  const userValues = validate(values)

  const { generated_keys: [userId] } = await r.table(TABLE).insert({
    createdAt: r.now(),
    ...userValues
  })
  return userId
}
