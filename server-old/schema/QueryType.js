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
          type: types.ViewerType,
          resolve () {
            return {}
          }
        }
      }
    }
  })
}
