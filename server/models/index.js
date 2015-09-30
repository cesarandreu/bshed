/**
 * Model loader
 * Each model is expected to export the following:
 *  NAME string
 *  TABLE string
 *  INDEXES array of strings
 */
import debug from 'debug'
import RethinkDB from 'rethinkdbdash'
const log = debug('app:models')

// Model imports
import * as Bikeshed from './bikeshed'
import * as User from './user'

const models = {
  Bikeshed,
  User
}

// Get a list with each model's name, table, and secondary indexes
export function getModelList () {
  return Object.keys(models).map(modelName => {
    const { NAME, TABLE, INDEXES } = models[modelName]
    return {
      NAME,
      TABLE,
      INDEXES
    }
  })
}

// Load database and models
export default function modelLoader (config: Object): Object {
  log('start')
  const r = RethinkDB(config)

  log('end')
  return { r, ...models }
}
