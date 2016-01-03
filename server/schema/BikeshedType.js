/**
 * BikeshedType
 */
import {
  GraphQLEnumType,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} from 'graphql'
import {
  modelField,
  modelGlobalIdField,
  modelIsTypeOf
} from './utils'
import {
  BIKESHED_STATUS
} from 'bshed-constants'

export default function getBikeshedType ({ types }) {
  types.BikeshedStatusType = new GraphQLEnumType({
    name: 'BikeshedStatus',
    values: {
      ACTIVE: {
        value: BIKESHED_STATUS.ACTIVE,
        description: 'Voting period is active'
      },
      CLOSED: {
        value: BIKESHED_STATUS.CLOSED,
        description: 'Voting period is closed'
      },
      ERROR: {
        value: BIKESHED_STATUS.ERROR,
        description: 'There was an error while processing'
      },
      PROCESSING: {
        value: BIKESHED_STATUS.PROCESSING,
        description: 'Processing uploads'
      },
      QUEUED: {
        value: BIKESHED_STATUS.QUEUED,
        description: 'Waiting in line to be processed'
      }
    }
  })

  types.BikeshedType = new GraphQLObjectType({
    name: 'Bikeshed',
    description: 'A collection of bikes for users to rate',
    interfaces: [types.nodeInterface],
    isTypeOf: modelIsTypeOf('Bikeshed'),
    fields () {
      return {
        bikes: {
          type: new GraphQLList(types.BikeType),
          async resolve (bikeshed) {
            const bikes = await bikeshed.bikes().fetch()
            return bikes.sortBy('key')
          }
        },

        bikeshedId: {
          type: new GraphQLNonNull(GraphQLID)
        },

        createdAt: modelField({
          type: new GraphQLNonNull(GraphQLString),
          description: 'When the bikeshed was created'
        }),

        creator: {
          type: new GraphQLNonNull(types.UserType),
          description: 'User that created this bikeshed',
          resolve (bikeshed) {
            return bikeshed.creator().fetch()
          }
        },

        description: modelField({
          type: new GraphQLNonNull(GraphQLString),
          description: 'User-provided description of the bikeshed'
        }),

        duration: modelField({
          type: new GraphQLNonNull(GraphQLInt),
          description: 'Number of minutes the voting period should last'
        }),

        endedAt: modelField({
          type: GraphQLString,
          description: 'When the bikeshed voting period ended'
        }),

        // endedProcessingAt

        // hasVoted

        id: modelGlobalIdField('Bikeshed'),

        processingOutput: modelField({
          type: GraphQLString,
          description: 'Any output generated while processing, errors will be here'
        }),

        // startedAt

        startedAt: modelField({
          type: GraphQLString,
          description: 'When the bikeshed voting period started'
        }),

        // startedProcessingAt

        status: modelField({
          type: new GraphQLNonNull(types.BikeshedStatusType),
          description: 'Current status'
        }),

        title: modelField({
          type: new GraphQLNonNull(GraphQLString),
          description: 'Bikeshed title'
        }),

        voteCount: {
          type: new GraphQLNonNull(GraphQLInt),
          description: 'Total number of votes on the bikeshed',
          resolve (bikeshed) {
            return bikeshed.voteCount()
          }
        }
      }
    }
  })
}
