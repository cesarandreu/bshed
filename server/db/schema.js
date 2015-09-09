/**
 * GraphQL schema
 */
import {
  // GraphQLEnumType,
  // GraphQLID,
  // GraphQLInt,
  // GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString
} from 'graphql'

import {
  // toGlobalId,
  connectionArgs,
  connectionDefinitions,
  connectionFromPromisedArray,
  // connectionFromArray,
  fromGlobalId,
  globalIdField,
  // mutationWithClientMutationId,
  nodeDefinitions,
} from 'graphql-relay'

export default function loadSchema (models) {
  const { nodeInterface, nodeField } = nodeDefinitions(
    // ID fetcher
    // @TODO: only fetch requested fields
    globalId => {
      const { type, id } = fromGlobalId(globalId)
      return type in models
        ? models[type].findById(id)
        : null
    },

    // Type resolver
    instance => {
      const modelName = instance && instance.Model && instance.Model.name
      return modelName in types
        ? types[modelName]
        : null
    }
  )

  const types = {
    /**
     * BIKE
     */
    // Bike: new GraphQLObjectType({
    //   name: 'Bike',
    //   description: 'An image inside a bikeshed',
    //   fields () {
    //     return {
    //       id: globalIdField('Bike'),
    //       name: {
    //         type: new GraphQLNonNull(GraphQLString),
    //         description: 'Image name'
    //       },
    //       width: {
    //         type: new GraphQLNonNull(GraphQLInt),
    //         description: 'Image width in pixels'
    //       },
    //       height: {
    //         type: new GraphQLNonNull(GraphQLInt),
    //         description: 'Image height in pixels'
    //       },
    //       size: {
    //         type: new GraphQLNonNull(GraphQLInt),
    //         description: 'Image size in bytes'
    //       },

    //       // @TODO: Figure out if I need to add GraphQLNonNull to this field
    //       // @TODO: Figure out if enum is the correct type for this
    //       type: new GraphQLEnumType({
    //         name: 'type',
    //         description: 'Image mime type',
    //         values: {
    //           'image/png': {
    //             value: 'image/png',
    //             description: 'png'
    //           },
    //           'image/jpeg': {
    //             value: 'image/jpeg',
    //             description: 'jpeg'
    //           }
    //         }
    //       }),

    //       bikeshed: {
    //         type: BikeshedConnection,
    //         description: 'A bike\'s bikeshed',
    //         args: connectionArgs
    //         // resolve (_, args) {}
    //       }
    //     }
    //   },
    //   interfaces: [nodeInterface]
    // }),

    /**
     * BIKESHED
     */
    Bikeshed: new GraphQLObjectType({
      name: 'Bikeshed',
      description: 'A collection of bikes for users to rate',
      fields () {
        return {
          id: globalIdField('Bikeshed'),
          description: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'Bikeshed description'
          },
          user: {
            // TODO: only fetch requested fields
            type: types.User,
            resolve (bikeshed) {
              return bikeshed.getUser()
            }
          }
        }
      },
      interfaces: [nodeInterface]
    }),

    /**
     * RATING
     */
    // Rating: new GraphQLObjectType({
    //   name: 'Rating',
    //   description: 'A collection of votes for each bike inside a bikeshed',
    //   fields () {
    //     return {
    //       id: globalIdField('Rating')
    //     }
    //   },
    //   interfaces: [nodeInterface]
    // }),

    /**
     * USER
     */
    User: new GraphQLObjectType({
      name: 'User',
      description: 'A user in the application',
      fields () {
        return {
          id: globalIdField('User'),
          name: {
            type: GraphQLString,
            description: 'User name'
          }
        }
      },
      interfaces: [nodeInterface]
    })

    /**
     * VOTE
     */
    // Vote: new GraphQLObjectType({
    //   name: 'Vote',
    //   description: 'A user score on a bike',
    //   fields () {
    //     return {
    //       id: globalIdField('Vote')
    //     }
    //   },
    //   interfaces: [nodeInterface]
    // })
  }

  // const { connectionType: BikeConnection } = connectionDefinitions({
  //   name: 'Bike',
  //   nodeType: types.Bike
  // })

  const { connectionType: BikeshedConnection } = connectionDefinitions({
    name: 'Bikeshed',
    nodeType: types.Bikeshed
  })

  // const { connectionType: RatingConnection } = connectionDefinitions({
  //   name: 'Rating',
  //   nodeType: types.Rating
  // })

  // const { connectionType: UserConnection } = connectionDefinitions({
  //   name: 'User',
  //   nodeType: types.User
  // })

  // const { connectionType: VoteConnection } = connectionDefinitions({
  //   name: 'Vote',
  //   nodeType: types.Vote
  // })

  const viewerType = new GraphQLObjectType({
    name: 'Viewer',
    fields () {
      return {
        bikesheds: {
          args: connectionArgs,
          type: BikeshedConnection,
          resolve (_, args, info) {
            // console.log('_', _, 'args', args, 'info', info)
            return connectionFromPromisedArray(models.Bikeshed.findAll(), args)
          }
        }
      }
    }
  })

  const queryType = new GraphQLObjectType({
    name: 'Query',
    fields () {
      return {
        viewer: {
          type: viewerType,
          description: 'Wrapper for global collections',
          resolve () {
            return {}
          }
        },
        node: nodeField
      }
    }
  })

  return new GraphQLSchema({
    query: queryType
  })
}
