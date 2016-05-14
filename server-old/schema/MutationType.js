/**
 * MutationType
 */
import {
  GraphQLObjectType
} from 'graphql'

export default function getMutationType ({ types }) {
  types.MutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields () {
      return {
        createBikeshed: types.CreateBikeshedMutation
      }
    }
  })
}
