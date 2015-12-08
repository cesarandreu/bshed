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
import Redlock from 'redlock'
import redis from 'redis'
import debug from 'debug'

const log = debug('app:models')

// Model imports
import Bikeshed from './bikeshed'
import User from './user'
import Vote from './vote'

const models = {
  Bikeshed,
  User,
  Vote
}

export function instantiateModels (r, redlock) {
  return Object.entries(models).reduce((instances, [name, Model]) => {
    invariant(
      BaseModel.isPrototypeOf(Model),
      `Models: Expected ${Model} to extend BaseModel.`
    )

    instances[name] = new Model({ r, redlock })
    return instances
  }, {})
}

// Load database and models
export default function modelLoader (config): Object {
  log('start')
  const redisClients = [
    redis.createClient(config.redis)
  ]
  const redlock = new Redlock(redisClients)
  const r = new RethinkDB(config.database)
  const instances = instantiateModels(r, redlock)
  log('end')
  return { r, redlock, redisClients, models, instances, ...instances }
}
