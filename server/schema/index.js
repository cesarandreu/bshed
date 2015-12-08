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
// import getVoteType from './VoteType'

// Connections
import getBikeshedConnection from './BikeshedConnection'

// Mutations
import getCreateBikeshedMutation from './CreateBikeshedMutation'

export function getSchema () {
  // This will eventually hold all our GraphQL types
  const types = {}

  const { nodeInterface, nodeField } = nodeDefinitions(
    async function idFetcher (globalId, { rootValue }) {
      const { type, id } = fromGlobalId(globalId)
      invariant(
        ['Bikeshed', 'User', 'Vote'].includes(type),
        `Invalid type "${type}"`
      )
      return await rootValue.loaders[type].load(id)
    },
    function typeResolver (instance) {
      switch (instance && instance.TYPE) {
        case 'Bikeshed':
          return types.BikeshedType
        case 'User':
          return types.UserType
        case 'Vote':
          return types.VoteType
        default:
          return null
      }
    }
  )
  Object.assign(types, {
    nodeInterface,
    nodeField
  })

  // Types
  getBikeshedType({ types })
  getBikeType({ types })
  getMutationType({ types })
  getQueryType({ types })
  getUserType({ types })
  // getVoteType({ types })

  // Connections
  getBikeshedConnection({ types })

  // Mutations
  getCreateBikeshedMutation({ types })

  return new GraphQLSchema({
    mutation: types.MutationType,
    query: types.QueryType
  })
}
