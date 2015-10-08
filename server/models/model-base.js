/**
 * Model Base
 * @flow
 */
import Joi from 'joi'
import assert from 'assert'

export default class ModelBase {
  constructor (r) {
    this.r = r
    assert(this.TYPE, 'Must provide TYPE')
    assert(this.TABLE, 'Must provide TABLE')
    assert(this.SCHEMA, 'Must provide SCHEMA')
    assert(this.INDEXES, 'Must provide INDEXES')
  }

  // Check model validity given a schema and some values
  static validate (schema, values) {
    const { error, value } = Joi.validate(values, schema, {
      stripUnknown: true
    })
    if (error) {
      throw error
    }
    return value
  }
  validate (values) {
    return ModelBase.validate(this.SCHEMA, values)
  }

  // Get an instance from the server
  static get (r, table: string, id: string) {
    return r.table(table).get(id)
  }
  get (id: string) {
    return ModelBase.get(this.r, this.TABLE, id)
  }
}
