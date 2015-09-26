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
  // cursorForObjectInConnection,
  fromGlobalId,
  globalIdField,
  mutationWithClientMutationId,
  nodeDefinitions
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
          },
          bikesheds: {
            args: connectionArgs,
            type: BikeshedConnection,
            async resolve (currentUser, args, info) {
              return connectionFromPromisedArray(Bikeshed.findAll(), args)
            }
          },
          isRegistered: {
            type: new GraphQLNonNull(GraphQLBoolean),
            resolve (currentUser) {
              return currentUser.isRegistered
            }
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

  const queryType = new GraphQLObjectType({
    name: 'Query',
    fields () {
      return {
        viewer: {
          type: types.User,
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
      bikeshed: {
        type: types.Bikeshed,
        async resolve ({ bikeshed }) {
          return bikeshed
        }
      },
      bikeshedEdge: {
        type: GraphQLBikeshedEdge,
        async resolve ({ bikeshed }) {
          if (bikeshed) {
            return {
              cursor: bikeshed.id,
              node: bikeshed
            }
          } else {
            return {
              cursor: null,
              node: bikeshed
            }
          }
        }
      },
      viewer: {
        type: types.User,
        async resolve (_, args, info) {
          console.log('resolve viewer!')
          const { userId } = info.rootValue
          return await User.findById(userId)
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
