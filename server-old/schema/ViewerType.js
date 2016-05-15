import {
  GraphQLObjectType
} from 'graphql'
import {
  connectionArgs
} from 'graphql-relay'

export default function getViewerType ({ types }) {
  types.ViewerType = new GraphQLObjectType({
    name: 'Viewer',
    description: 'Current user',
    fields () {
      return {
        user: {
          type: types.UserType,
          resolve (_, args, { rootValue: { models, userId } }) {
            return new models.User({ id: userId }).fetch()
          }
        },

        bikesheds: {
          args: connectionArgs,
          type: types.BikeshedConnectionType
        }
      }
    }
  })
}
