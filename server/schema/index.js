/**
 * GraphQL schema
 */
import {
  GraphQLSchema
} from 'graphql'
import {
  fromGlobalId,
  nodeDefinitions
} from 'graphql-relay'
import invariant from 'invariant'

// Types
import getBikeshedType from './BikeshedType'
import getBikeType from './BikeType'
import getMutationType from './MutationType'
import getQueryType from './QueryType'
import getUserType from './UserType'
import getViewerType from './ViewerType'
const TYPES_LIST = [
  getBikeshedType,
  getBikeType,
  getMutationType,
  getQueryType,
  getUserType,
  getViewerType
]

// Connections
import getBikeshedConnection from './BikeshedConnection'
const CONNECTIONS_LIST = [
  getBikeshedConnection
]

// Mutations
import getCreateBikeshedMutation from './CreateBikeshedMutation'
const MUTATIONS_LIST = [
  getCreateBikeshedMutation
]

// Group all the lists in order
const FINAL_LIST = [
  // Types
  ...TYPES_LIST,

  // Connections
  ...CONNECTIONS_LIST,

  // Mutations
  ...MUTATIONS_LIST
]

// Export a schema singleton by default
export default createSchema()

// createSchema can be used to create a new schema instance
export function createSchema () {
  // This will eventually hold all our GraphQL types
  const types = {}

  // Model that can be fetched by global id
  const validModelsTypes = new Set([
    'Bike',
    'Bikeshed',
    'User'
  ])

  const { nodeInterface, nodeField } = nodeDefinitions(
    async function idFetcher (globalId, { rootValue }) {
      const { type, id } = fromGlobalId(globalId)
      invariant(validModelsTypes.has(type), `Invalid type "${type}"`)

      const Model = rootValue.models[type]
      invariant(Model, `Invalid type "${type}"`)

      return Model.where('id', id).fetch()
    }
  )
  Object.assign(types, {
    nodeInterface,
    nodeField
  })

  // Initialize each list item
  FINAL_LIST.forEach(createType => createType({ types }))

  return new GraphQLSchema({
    mutation: types.MutationType,
    query: types.QueryType
  })
}
