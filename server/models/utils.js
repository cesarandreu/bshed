/**
 * Model utils
 */
import Joi from 'joi'

export function createValidate (Schema) {
  return function validate (values) {
    const { error, value } = Joi.validate(values, Schema, {
      stripUnknown: true
    })
    if (error) {
      throw error
    }
    return value
  }
}

export function createGet (table: string) {
  return function get (r, id: string) {
    return r.table(table).get(id)
  }
}
