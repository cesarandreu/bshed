import { camelCase, snakeCase } from 'lodash'

const parse = createConverter(camelCase)
const format = createConverter(snakeCase)

/**
 * Convert attributes to snake_case when they go in
 * and camelCase when they come out
 */
export default function camelizeKeys (bookshelf) {
  bookshelf.Model = bookshelf.Model.extend({
    format,
    parse
  })
}

function createConverter (fn) {
  return function converter (attrs) {
    return Object.entries(attrs).reduce((attrs, [attrName, attrValue]) => {
      attrs[fn(attrName)] = attrValue
      return attrs
    }, {})
  }
}
