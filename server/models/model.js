/**
 * BaseModel
 * @flow
 */
import Joi from 'joi'
import invariant from 'invariant'

export default class BaseModel {
  constructor ({ r }) {
    this.r = r
    invariant(
      this.TYPE,
      `${this.constructor.name}: Expected TYPE to be defined.`
    )
    invariant(
      this.TABLE,
      `${this.constructor.name}: Expected TABLE to be defined.`
    )
    invariant(
      this.SCHEMA,
      `${this.constructor.name}: Expected SCHEMA to be defined.`
    )
    invariant(
      Array.isArray(this.INDEXES),
      `${this.constructor.name}: Expected INDEXES array to be defined.`
    )
  }

  // Create table if it doesn't already exist
  async createTable () {
    const tableList = await this.r.tableList()
    if (!tableList.includes(this.TABLE)) {
      await this.r.tableCreate(this.TABLE)
    }
  }

  // Create indexes if they doesn't already exist
  async createIndexes () {
    const indexList = await this.r.table(this.TABLE).indexList()
    await Promise.all(this.INDEXES
      .filter(INDEX => !indexList.includes(INDEX))
      .map(INDEX => this.r.table(this.TABLE).indexCreate(INDEX))
    )
  }

  // Check model validity given a schema and some values
  validate (values = {}) {
    return Joi.attempt(values, this.SCHEMA)
  }

  // Get an instance from the server
  get (id: string) {
    return this.r.table(this.TABLE).get(id)
  }

  // Save a model in the database
  // Returns the generated id
  async create (values) {
    const inputValues = this.validate(values)
    const { generated_keys: [ id ] } = await this.r.table(this.TABLE).insert({
      createdAt: this.r.now(),
      ...inputValues
    })
    return id
  }
}
