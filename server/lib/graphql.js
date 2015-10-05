/**
 * GraphQL Controller
 */
import { formatError } from 'graphql/error'
import { graphql } from 'graphql'
import Router from 'koa-router'
import parse from 'co-body'

// Static parser options
const PARSE_OPTIONS = { limit: '100kb' }

/**
 * GraphQL controller
 */
export default function GraphqlController () {
  const routes = new Router()
    .get(
      '/graphql',
      GraphqlController.handleErrors,
      GraphqlController.prepare,
      GraphqlController.perform
    )
    .post(
      '/graphql',
      GraphqlController.handleErrors,
      GraphqlController.prepare,
      GraphqlController.perform
    )

  return routes.middleware()
}

// Wrapper for error-handling
GraphqlController.handleErrors = function * handleErrors (next) {
  try {
    yield next
  } catch (error) {
    this.status = error.status || 500
    this.body = { errors: [ formatError(error) ] }
  }
}

// Prepare everything for GraphQL
GraphqlController.prepare = function * prepare (next) {
  // Make sure configuration is correct
  const { schema, rootValue } = this.graphql
  this.assert(schema, 500, 'GraphQL requires a schema.')
  this.assert(rootValue, 500, 'GraphQL requires a rootValue.')

  // Skip requests without content type
  const hasContentType = this.request.type !== undefined

  // If koa already has a body, use it
  const hasEmptyBody = this.request.body === undefined

  if (hasEmptyBody && hasContentType) {
    // Use the correct body parser based on Content-Type header
    switch (this.request.type) {
      case 'application/graphql':
        const body = yield parse.text(this, PARSE_OPTIONS)
        this.request.body = { query: body }
        break
      case 'application/json':
        this.request.body = yield parse.json(this, PARSE_OPTIONS)
        break
      case 'application/x-www-form-urlencoded':
        this.request.body = yield parse.form(this, PARSE_OPTIONS)
        break
      case 'multipart/form-data':
        yield this.uploader(this.req, this.res)
        this.request.body = this.req.body

        // Terrible hack
        // Sample output: { image0: fileInfo, image1: fileInfo }
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

  // GraphQL query string
  this.graphql.query = this.query.query || this.request.body.query
  this.assert(this.graphql.query, 400, 'Must provide query string.')

  // Parse the variables if needed
  const variables = this.query.variables || this.request.body.variables
  if (variables) {
    if (typeof variables === 'string') {
      try {
        this.graphql.variables = JSON.parse(variables)
      } catch (err) {
        this.throw(400, 'Variables are invalid JSON.')
      }
    } else {
      this.graphql.variables = variables
    }
  }

  // Name of GraphQL operation to execute
  this.graphql.operationName = this.query.operationName || this.request.body.operationName

  // Populate rootValue
  Object.assign(this.graphql.rootValue, {
    // uploaded files
    files: this.request.files || {},

    // userId from session
    userId: this.session.userId,

    // requestId
    requestId: this.request.requestId,

    // createImageJob
    createImageJob: this.createImageJob
  })

  yield next
}

// Execute the GraphQL query
GraphqlController.perform = function * perform () {
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
