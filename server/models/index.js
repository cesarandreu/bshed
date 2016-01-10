/**
 * Model loader
 */
import debug from 'debug'
import createKnex from 'knex'
import createBookshelf from 'bookshelf'
import { camelCase, snakeCase } from 'lodash'

const log = debug('server:models')

// Model classes
import Bike from './bike'
import Bikeshed from './bikeshed'
import Score from './score'
import User from './user'
import Vote from './vote'


export default function createModels ({ database }) {
  const knex = createKnex(database)
  const bookshelf = createBookshelf(knex)

  bookshelf.plugin('virtuals')
  bookshelf.plugin(camelizeKeys)

  return Object.entries({
    Bike,
    Bikeshed,
    Score,
    User,
    Vote
  })
  .reduce((models, [name, createModel]) => {
    log(`creating "${name}"`)
    models[name] = createModel(models)
    return models
  }, {
    bookshelf,
    knex
  })
}

/**
 * Convert attributes to camelCase when they come out
 * and to snake_case when they go in
 */
function camelizeKeys (bookshelf) {
  bookshelf.Model = bookshelf.Model.extend({
    // Convert attributes to camelCase when they come out
    parse (attrs) {
      return Object.entries(attrs)
      .reduce((attrs, [attrName, attrValue]) => {
        attrs[camelCase(attrName)] = attrValue
        return attrs
      }, {})
    },

    // Convert keys to snake_case when they go in
    format (attrs) {
      return Object.entries(attrs)
      .reduce((attrs, [attrName, attrValue]) => {
        attrs[snakeCase(attrName)] = attrValue
        return attrs
      }, {})
    }
  })
}
