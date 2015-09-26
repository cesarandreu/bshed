import { formatError } from 'graphql/error'
import { graphql } from 'graphql'
import Router from 'koa-router'
import parse from 'co-body'

/**
 * GraphQL controller
 */
export default function GraphqlController () {
  const routes = new Router()
    .use(
      GraphqlController.handleErrors,
      GraphqlController.checkOptions,
      GraphqlController.parseBody,
      GraphqlController.getParams
    )
    .get(
      '/graphql',
      GraphqlController.graphqlHTTP
    )
    .post(
      '/graphql',
      GraphqlController.graphqlHTTP
    )

  return routes.middleware()
}

GraphqlController.handleErrors = function * handleErrors (next) {
  try {
    return yield next
  } catch (error) {
    this.status = error.status || 500
    this.body = { errors: [ formatError(error) ] }
  }
}

GraphqlController.checkOptions = function * checkOptions (next) {
  const { schema, rootValue } = this.graphql
  this.assert(schema, 500, 'GraphQL requires a schema')
  this.assert(rootValue, 500, 'GraphQL requires a rootValue')
  return yield next
}

GraphqlController.parseBody = function * parseBody (next) {
  // If koa already has a body, use it
  const hasEmptyBody = this.request.body === undefined

  // Skip requests without content type
  const hasContentType = this.get('Content-Type') !== undefined

  if (hasEmptyBody && hasContentType) {
    // Set a sane default parser limit
    const parseOpts = { limit: '100kb' }

    // Use the correct body parser based on Content-Type header
    switch (this.request.type) {
      case 'application/graphql':
        const body = yield parse.text(this, parseOpts)
        this.request.body = { query: body }
        break
      case 'application/json':
        this.request.body = yield parse.json(this, parseOpts)
        break
      case 'application/x-www-form-urlencoded':
        this.request.body = yield parse.form(this, parseOpts)
        break
      case 'multipart/form-data':
        yield this.uploader(this.req, this.res)
        // Set body
        this.request.body = this.req.body

        // Terrible hack
        // Set files
        this.request.files = Object.entries(this.req.files)
        .reduce((files, [name, [file]]) => {
          files[name] = file
          return files
        }, {})
        break
      default:
        this.request.body = {}
        break
    }
  }
  return yield next
}

GraphqlController.getParams = function * getParams (next) {
  // GraphQL query string
  this.graphql.query = this.query.query || this.request.body.query
  this.assert(this.graphql.query, 400, 'Must provide query string.')

  // Parse the variables if needed
  const variables = this.query.variables || this.request.body.variables
  if (variables && typeof variables === 'string') {
    try {
      this.graphql.variables = JSON.parse(variables)
    } catch (err) {
      this.throw(400, 'Variables are invalid JSON.')
    }
  } else {
    this.graphql.variables = variables
  }

  // Add files to variables
  if (this.request.files) {
    Object.assign(this.graphql.variables, this.request.files)
  }

  // Name of GraphQL operation to execute
  this.graphql.operationName = this.query.operationName || this.request.body.operationName

  return yield next
}

GraphqlController.graphqlHTTP = function * graphqlHTTP () {
  // Add userId from session to graphql rootValue
  this.graphql.rootValue.userId = this.session.userId

  const { query, variables, operationName, schema, rootValue } = this.graphql
  const result = yield graphql(schema, query, rootValue, variables, operationName)

  // Format any encountered errors
  if (result.errors) {
    result.errors = result.errors.map(formatError)
  }

  // Report 200 success if a data key exists,
  // Othewise 400 bad request if only errors exist
  this.status = result.hasOwnProperty('data') ? 200 : 400
  this.body = result
}
