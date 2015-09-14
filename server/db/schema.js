/**
 * GraphQL schema
 * @flow
 */
import {
  GraphQLBoolean,
  // GraphQLEnumType,
  // GraphQLID,
  GraphQLInt,
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
  cursorForObjectInConnection,
  fromGlobalId,
  globalIdField,
  mutationWithClientMutationId,
  nodeDefinitions,
} from 'graphql-relay'

export default function loadSchema (models: Object) {
  const {
    Bikeshed,
    Rating,
    User,
    Vote
  } = models

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

  // Resource types
  const types = {
    /**
     * BIKE
     */
    Bike: new GraphQLObjectType({
      name: 'Bike',
      description: 'An image inside a bikeshed',
      fields () {
        return {
          id: globalIdField('Bike'),
          name: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'Image name'
          },
          width: {
            type: new GraphQLNonNull(GraphQLInt),
            description: 'Image width in pixels'
          },
          height: {
            type: new GraphQLNonNull(GraphQLInt),
            description: 'Image height in pixels'
          },
          size: {
            type: new GraphQLNonNull(GraphQLInt),
            description: 'Image size in bytes'
          },

          // @TODO: Figure out if I need to add GraphQLNonNull to this field
          // @TODO: Figure out if enum is the correct type for this
          // type: new GraphQLEnumType({
          //   name: 'type',
          //   description: 'Image mime type',
          //   values: {
          //     'png': {
          //       value: 'image/png',
          //       description: 'png'
          //     },
          //     'jpeg': {
          //       value: 'image/jpeg',
          //       description: 'jpeg'
          //     }
          //   }
          // }),
          bikeshed: {
            type: types.Bikeshed,
            description: 'The bikeshed to which the bike belongs',
            resolve (bike) {
              return bike.getBikeshed()
            }
          },
          totalRating: {
            type: GraphQLInt,
            description: 'The sum of each rating',
            resolve (bike) {
              return Rating.sum('value', {
                where: {
                  BikeId: bike.id
                }
              })
            }
          }

        }
      },
      interfaces: [nodeInterface]
    }),

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
          creator: {
            description: 'User that created the bikeshed',
            type: types.User,
            resolve (bikeshed) {
              return bikeshed.getUser()
            }
          },
          bikes: {
            type: BikeConnection,
            description: 'A bikeshed\'s bikes',
            args: connectionArgs,
            resolve (bikeshed, args) {
              return connectionFromPromisedArray(bikeshed.getBikes(), args)
            }
          },
          voteCount: {
            type: GraphQLInt,
            description: 'Total number of votes on a bikeshed',
            resolve (bikeshed) {
              return Vote.count({
                where: {
                  BikeshedId: bikeshed.id
                }
              })
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
    //   description: 'The rating a user gave a bike in his vote',
    //   fields () {
    //     return {
    //       id: globalIdField('Rating'),
    //       value: {
    //         type: GraphQLInt,
    //         description: 'The rating\'s value'
    //       }
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
    //   description: 'A user\'s ratings on each bike in a bikeshed',
    //   fields () {
    //     return {
    //       id: globalIdField('Vote')
    //     }
    //   },
    //   interfaces: [nodeInterface]
    // })
  }

  const {
    connectionType: BikeConnection
    // edgeType: GraphQLBikeEdge
  } = connectionDefinitions({
    name: 'Bike',
    nodeType: types.Bike
  })

  const {
    connectionType: BikeshedConnection,
    edgeType: GraphQLBikeshedEdge
  } = connectionDefinitions({
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
        isRegistered: {
          type: new GraphQLNonNull(GraphQLBoolean),
          resolve (currentUser) {
            // const { userId } = info.rootValue
            // const user = await User.findById(userId)
            // return user.isRegistered
            console.log('currentUser', currentUser)
            return currentUser.isRegistered
          }
        },
        bikesheds: {
          args: connectionArgs,
          type: BikeshedConnection,
          resolve (currentUser, args, info) {
            // console.log('_', _, 'args', args, 'info', info)
            return connectionFromPromisedArray(Bikeshed.findAll(), args)
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
          description: 'Things the viewer can access',
          async resolve (_, args, info) {
            const { userId } = info.rootValue
            return await User.findById(userId)
          }
        },
        node: nodeField
      }
    }
  })

  const createBikeshedMutation = mutationWithClientMutationId({
    name: 'CreateBikeshed',
    inputFields: {
      description: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    outputFields: {
      bikeshedEdge: {
        type: GraphQLBikeshedEdge,
        async resolve (bikeshed) {
          if (bikeshed) {
            const bikeshedList = await Bikeshed.findAll()
            return {
              cursor: cursorForObjectInConnection(bikeshedList, bikeshed),
              node: bikeshed
            }
          } else {
            return null
          }
        }
      }
    },
    async mutateAndGetPayload (inputFields, info) {
      const { description } = inputFields
      const { userId } = info.rootValue

      const bikeshed = await Bikeshed.create({
        description: description,
        UserId: userId
      })

      return {
        bikeshed
      }
    }
  })

  const mutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields () {
      return {
        createBikeshed: createBikeshedMutation
      }
    }
  })

  return new GraphQLSchema({
    query: queryType,
    mutation: mutationType
  })
}
