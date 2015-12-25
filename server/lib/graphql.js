/**
 * GraphQL middleware
 * Validates the request and executes the query
 */
import debug from 'debug'
import bodyParser from 'co-body'
import invariant from 'invariant'
import createError from 'http-errors'
import { execute } from 'graphql/execution'
import { formatError } from 'graphql/error'
import { validate } from 'graphql/validation'
import { parse, Source } from 'graphql/language'
import { getOperationAST } from 'graphql/utilities/getOperationAST'

const log = debug('server:graphql')

// Static parser options
const PARSE_OPTIONS = { limit: '100kb' }

/**
 * GraphQL middleware
 */
export default function graphqlHTTP (options) {
  invariant(options, 'GraphQL middleware requires options param')

  return async function graphqlHTTPMiddleware (ctx) {
    try {
      return await perform(ctx, options)
    } catch (error) {
      ctx.status = error.status || 500
      ctx.body = { errors: [ formatError(error) ] }
      log(ctx.body)
    }
  }
}

/**
 * Call each helper and make sure everything is going as expected
 */
async function perform (ctx, options) {
  // @TODO: Remove? Not needed since it's handled upstream
  if (ctx.method !== 'GET' && ctx.method !== 'POST') {
    ctx.set('Allow', 'GET, POST')
    ctx.throw(405, 'GraphQL only supports GET and POST requests.')
  }

  // Get schema and rootValue
  const { schema, rootValue } = await getOptions(options, ctx)

  // Parse the request body
  const body = await parseBody(ctx)

  // Get GraphQL params from the request and POST body data
  const { operationName, query, variables } = getGraphQLParams(ctx, body)

  // Run the GraphQL query
  const result = await runQuery(ctx, {
    schema,
    rootValue,
    variables,
    operationName,
    query
  })

  // Format any encountered errors
  if (result.errors) {
    result.errors = result.errors.map(formatError)
    log(result)
  }

  // Report 200:Success if a data key exists,
  // Otherwise 400:BadRequest if only errors exist
  ctx.status = result.hasOwnProperty('data') ? 200 : 400
  ctx.body = result
}

/**
 * Get the options that the middleware was configured
 */
async function getOptions (options, ctx) {
  const optionsData = typeof options === 'function'
    ? await options(ctx)
    : options

  invariant(
    optionsData || typeof optionsData !== 'object',
    'GraphQL middleware option function must return an options object.'
  )

  invariant(
    optionsData.schema,
    'GraphQL middleware options must contain a schema.'
  )

  return optionsData
}

/**
 * Helper function to parse the body
 */
async function parseBody (ctx) {
  // Skip requests without content type
  const hasContentType = ctx.request.type !== undefined

  // If koa already has body, use it
  const hasEmptyBody = ctx.request.body === undefined

  if (hasEmptyBody && hasContentType) {
    switch (ctx.request.type) {
      case 'application/graphql':
        const body = await bodyParser.text(ctx, PARSE_OPTIONS)
        ctx.request.body = { query: body }
        break
      case 'application/json':
        ctx.request.body = await bodyParser.json(ctx, PARSE_OPTIONS)
        break
      case 'application/x-www-form-encoded':
        ctx.request.body = await bodyParser.form(ctx, PARSE_OPTIONS)
        break
      default:
        ctx.request.body = {}
        break
    }
  }
  return ctx.request.body
}

/**
 * Get the GraphQL params from the request
 */
function getGraphQLParams (ctx, body = {}) {
  // GraphQL Query String
  const query = ctx.query.query || body.query
  ctx.assert(query, 400, 'Must provide query string.')

  // Parse the variables if needed
  const variables = getVariables(ctx.query.variables || body.variables)

  // Name of GraphQL operation to execute
  const operationName = ctx.query.operationName || body.operationName

  return {
    operationName,
    query,
    variables
  }

  // Try parsing the variables JSON if there's any
  function getVariables (variables) {
    if (variables && typeof variables === 'string') {
      try {
        return JSON.parse(variables)
      } catch (err) {
        throw createError(400, 'Variables are invalid JSON.')
      }
    }
  }
}

/**
 * Run GraphQL query
 */
async function runQuery (ctx, { schema, rootValue, variables, operationName, query }) {
  const source = new Source(query, 'GraphQL request')
  const documentAST = parse(source)
  const validationErrors = validate(schema, documentAST)
  if (validationErrors.length) {
    return {
      errors: validationErrors
    }
  } else {
    // Only query operations are allowed on GET requests
    if (ctx.method === 'GET') {
      // Determine if this GET request will perform a non-query
      const operationAST = getOperationAST(documentAST, operationName)
      if (operationAST && operationAST.operation !== 'query') {
        ctx.set('Allow', 'POST')
        ctx.throw(
          405,
          `Can only perform a ${operationAST.operation} operation from a POST request.`
        )
      }
    }

    // Perform the execution
    return await execute(
      schema,
      documentAST,
      rootValue,
      variables,
      operationName
    )
  }
}
