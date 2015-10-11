/**
 * Model loader
 * Each model is expected to have the following:
 *  TYPE string
 *  TABLE string
 *  INDEXES array of strings
 *  SCHEMA joi schema definition
 */
import RethinkDB from 'rethinkdbdash'
import invariant from 'invariant'
import BaseModel from './model'
import debug from 'debug'

const log = debug('app:models')

// Model imports
import Bikeshed from './bikeshed'
import User from './user'

const models = {
  Bikeshed,
  User
}

export function instantiateModels (r) {
  return Object.entries(models).reduce((instances, [name, Model]) => {
    invariant(
      BaseModel.isPrototypeOf(Model),
      `Models: Expected ${Model} to extend BaseModel.`
    )

    instances[name] = new Model({ r })
    return instances
  }, {})
}

// Load database and models
export default function modelLoader (config: Object): Object {
  log('start')
  const r = RethinkDB(config)
  const instances = instantiateModels(r)
  log('end')
  return { r, models, ...instances }
}
