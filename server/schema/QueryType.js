/**
 * QueryType
 */
import {
  GraphQLObjectType
} from 'graphql'

export default function getQueryType ({ types }) {
  types.QueryType = new GraphQLObjectType({
    name: 'Query',
    fields () {
      return {
        node: types.nodeField,

        viewer: {
          type: types.UserType,
          resolve (_, args, { rootValue: { userId, loaders } }) {
            return loaders.User.load(userId)
          }
        }
      }
    }
  })
}
