/**
 * CreateBikeshedMutation
 */
import {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLString
} from 'graphql'
import {
  mutationWithClientMutationId
} from 'graphql-relay'
import {
  BIKESHED_STATUS
} from 'bshed-constants'
import Joi from 'joi'
import { times } from 'lodash'
import { ProcessImagesWorker } from 'bshed-workers'
import { MAXIMUM_IMAGE_COUNT, MINIMUM_IMAGE_COUNT } from 'bshed-constants'

const CREATE_BIKESHED_INPUT_FIELDS_SCHEMA = Joi.object({
  clientMutationId: Joi.string().required(),
  duration: Joi.any().valid(60).required(),
  title: Joi.string().min(1).max(1000).required()
})

const CREATE_BIKESHED_BIKE_LIST_SCHEMA = Joi.array()
.max(MAXIMUM_IMAGE_COUNT)
.min(MINIMUM_IMAGE_COUNT)
.ordered(
  ...times(MAXIMUM_IMAGE_COUNT, n =>
    n < MINIMUM_IMAGE_COUNT
      ? Joi.any().allow(n).required()
      : Joi.any().allow(n)
  )
)

export default function getCreateBikeshedMutation ({ types }) {
  types.CreateBikeshedMutation = mutationWithClientMutationId({
    name: 'CreateBikeshed',

    inputFields: {
      duration: {
        type: new GraphQLNonNull(GraphQLInt),
        description: 'Desired voting duration in minutes'
      },
      title: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'Bikeshed title'
      }
    },

    outputFields: {
      bikeshed: {
        type: new GraphQLNonNull(types.BikeshedType)
      }
    },

    async mutateAndGetPayload (inputFields, { rootValue }) {
      const {
        duration,
        title,
        ...otherInputFields
      } = Joi.attempt(inputFields, CREATE_BIKESHED_INPUT_FIELDS_SCHEMA)

      const {
        files,
        models,
        queues,
        requestId,
        userId
      } = rootValue

      const {
        Bikeshed,
        bookshelf
      } = models

      const bikeList = Object.values(files).map((file) => ({
        field: file.fieldname,
        key: Number.parseInt(file.fieldname, 10),
        mimetype: file.mimetype,
        name: file.originalname,
        size: file.size
      }))
      Joi.assert(
        bikeList.map(bike => bike.key).sort(),
        CREATE_BIKESHED_BIKE_LIST_SCHEMA
      )

      return await bookshelf.transaction(async t => {
        // Forge and save the bikeshed
        const bikeshed = await Bikeshed.forge({
          duration: duration,
          requestId: requestId,
          status: BIKESHED_STATUS.QUEUED,
          title: title,
          userId: userId
        }).save(null, { transacting: t })

        // Create the bikes in the bikeshed
        const bikes = bikeshed.bikes()
        await Promise.all(
          bikeList.map(bike => bikes.create(bike, { transacting: t }))
        )

        // Queue the files for processing in processImageQueue
        const queueData = bikeshed.getAddBikeshedQueueData(bikes)
        await ProcessImagesWorker.addBikeshed(queues.processImageQueue, queueData)

        return {
          bikes,
          bikeshed
        }
      })
    }
  })
}
