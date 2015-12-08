/**
 * Model loader
 */
import debug from 'debug'
import redis from 'redis'
import Redlock from 'redlock'
import RethinkDB from 'rethinkdbdash'
import * as config from 'bshed/config'
const log = debug('server:models')

import Bikeshed from './bikeshed'
import User from './user'
import Vote from './vote'

export const MODELS = {
  Bikeshed,
  User,
  Vote
}

export const TABLES = Object.values(MODELS).map(model => model.TABLE)

export const INDEXES = Object.entries(MODELS).reduce((indexes, [modelName, model]) => {
  indexes[model.TABLE] = model.INDEXES
  return indexes
}, {})

// Given a rethinkdbdash and redlock instance, instantiate each model
export function createModels ({ r, redlock }) {
  log('creating models')
  return Object.entries(MODELS).reduce((instances, [name, createModel]) => {
    log(`creating "${name}"`)
    instances[name] = createModel({ r, redlock })
    return instances
  }, { r, redlock })
}

// Get self-initialized model instances
export function getModels () {
  log('initializing rethinkdb')
  const r = new RethinkDB(config.rethinkdb)

  log('initializing redlock')
  const redlock = new Redlock([
    redis.createClient(config.redis)
  ])

  return createModels({ r, redlock })
}
