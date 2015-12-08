/**
 * Base model
 */
export default function createModel ({ r }, { ...modelBase }) {
  const _r = r.table(modelBase.TABLE)
  const Model = {
    _r,

    addRecordType (record) {
      return Promise.resolve(record).then(record => ({ ...record, TYPE: Model.TYPE }))
    },

    async batchLoad (keys: Array<string>) {
      const result = await _r.getAll(r.args(keys), { index: 'id' })
      return Promise.all(result.map(Model.addRecordType))
    },

    create (values) {
      return Model.insert(Model.validate(values))
    },

    get (id: string) {
      return Model.addRecordType(_r.get(id))
    },

    async insert (values) {
      const { changes: [{ new_val: record }] } = await _r.insert({
        createdAt: r.now(),
        updatedAt: r.now(),
        ...values
      }, {
        returnChanges: true
      })
      return Model.addRecordType(record)
    },

    validate (values = {}) {
      const { error, value } = Model.SCHEMA.validate(values)
      if (error) {
        throw error
      }
      return value
    },

    ...modelBase
  }

  return Model
}
