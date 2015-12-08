/**
 * CreateBikeshedMutation
 */
import {
  GraphQLNonNull,
  GraphQLString
} from 'graphql'
import {
  mutationWithClientMutationId
} from 'graphql-relay'
import mime from 'mime'

export default function getCreateBikeshedMutation ({ types }) {
  types.CreateBikeshedMutation = mutationWithClientMutationId({
    name: 'CreateBikeshed',
    inputFields: {
      description: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    outputFields: {
      bikeshedEdge: {
        type: types.BikeshedEdgeType,
        resolve ({ bikeshedId, bikeshed }, args, info) {
          return {
            cursor: bikeshedId,
            node: bikeshed
          }
        }
      },
      viewer: {
        type: types.UserType,
        resolve (_, args, { rootValue: { loaders, userId } }) {
          return loaders.User.load(userId)
        }
      }
    },
    async mutateAndGetPayload ({ clientMutationId, ...inputFields }, { rootValue }) {
      const { files, processImageQueue, requestId, userId } = rootValue

      const bikeshedId = '105'

      // Update files to include more property
      const fileList = Object.values(files)
      .map(file => {
        file.extension = mime.extension(file.mimetype)
        file.outputLocation = `bikesheds/${bikeshedId}`
        file.outputName = `${file.fieldname}.${file.extension}`
        file.uploadLocation = file.key
        return file
      })

      // Push item to the queue
      processImageQueue.add({
        bikeshedId,
        fileList,
        requestId,
        userId
      }, {
        attemps: 5,
        backoff: {
          type: 'exponential'
        }
      })

      return {}
      // @TODO~
      // const { userId, requestId, files, applicationImageQueue } = rootValue
      // const fileList = Object.values(files)

      // const bikeshedId = await Bikeshed.create({
      //   ...inputFields,
      //   requestId,
      //   fileList,
      //   userId
      // })

      // const bikeshed = await Bikeshed.get(bikeshedId)
      // await applicationImageQueue.addBikeshed(bikeshed)

      // return {
      //   bikeshedId,
      //   bikeshed
      // }
    }
  })
}
