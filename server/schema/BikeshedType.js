/**
 * BikeshedType
 */
import {
  GraphQLEnumType,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} from 'graphql'
import {
  globalIdField
} from 'graphql-relay'
// import mime from 'mime'

export default function getBikeshedType ({ types }) {
  types.BikeshedType = new GraphQLObjectType({
    name: 'Bikeshed',
    description: 'A collection of bikes for users to rate',
    fields () {
      return {
        // duration: {

        // },

        id: globalIdField('Bikeshed'),

        title: {
          type: GraphQLString
        },

        status: {
          name: 'status',
          type: new GraphQLEnumType({
            name: 'status',
            values: {
              ERROR: {
                value: 'error',
                description: 'Failed while processing'
              },
              PROCESSING: {
                value: 'processing',
                description: 'Was accepted and is being processed'
              },
              QUEUED: {
                value: 'queued',
                description: 'Waiting in line to be processed'
              },
              READY: {
                value: 'ready',
                description: 'Ready for user'
              }
            }
          })
        },

        creator: {
          type: types.UserType,
          description: 'User that created the bikeshed',
          resolve (bikeshed, args, { rootValue: { loaders } }) {
            return loaders.User.load(bikeshed.userId)
          }
        },

        voteCount: {
          type: new GraphQLNonNull(GraphQLInt),
          description: 'Number of votes on the bikeshed',
          resolve (bikeshed, args, { rootValue: { loaders } }) {
            // return loaders.BikeshedVotes.load(bikeshed.id)
            // @TODO: implement this~
          }
        },

        hasVoted: {
          type: new GraphQLNonNull(GraphQLInt),
          description: 'If the user can vote on this bikeshed',
          resolve (bikeshed, args, { rootValue: { loaders, userId } }) {
            // return loaders.User
            // @TODO: implement this~
          }
        },

        bikes: {
          type: new GraphQLList(types.BikeType),
          description: 'Images that users are rating',
          resolve (bikeshed, args, { rootValue: { loaders, userId } }) {
            // const { userId } = info.rootValue
            // const fields = SchemaUtils.getFields(info)
            // const [scores, ratings] = await Promise.all([
            //   fields.includes('score')
            //     ? Vote.bikeshedScores(bikeshed.id)
            //     : [],
            //   fields.includes('rating')
            //     ? Vote.bikeshedUserRatings(userId, bikeshed.id)
            //     : []
            // ])
            // console.log('bikeshed.fileList', bikeshed.fileList)
            // return bikeshed.fileList.map((file, idx) => ({
            //   bikeshedId: bikeshed.id,
            //   userId: bikeshed.userId,
            //   rating: ratings[idx],
            //   score: scores[idx],
            //   ...file
            // }))

            return bikeshed.fileList.map((file, idx) => ({
              bikeshedId: bikeshed.id,
              index: idx,
              userId: bikeshed.userId,
              ...file
            }))
          }
        }
      }
    },
    interfaces: [types.nodeInterface]
  })
}
