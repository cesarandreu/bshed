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

export default function createSchema () {
  // This will eventually hold all our GraphQL types
  const types = {}

  const { nodeInterface, nodeField } = nodeDefinitions(
    async function idFetcher (globalId, { rootValue }) {
      const { type, id } = fromGlobalId(globalId)
      invariant(
        ['Bike', 'Bikeshed', 'User'].includes(type),
        `Invalid type "${type}"`
      )

      const Model = rootValue.models[type]
      invariant(
        Model,
        `Invalid type "${type}"`
      )

      return new Model({ id }).fetch()
    }
  )
  Object.assign(types, {
    nodeInterface,
    nodeField
  })

  // Initialize each list
  const FINAL_LIST = [
    // Types
    ...TYPES_LIST,

    // Connections
    ...CONNECTIONS_LIST,

    // Mutations
    ...MUTATIONS_LIST
  ]
  FINAL_LIST.forEach(createType => createType({ types }))

  return new GraphQLSchema({
    mutation: types.MutationType,
    query: types.QueryType
  })
}
