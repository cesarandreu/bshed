/**
 * Bikeshed model
 * Fields:
 *  createdAt {timestamptz} When it was created
 *  duration {number} How long the voting period should last in minutes
 *  endedAt {timestamptz} When the voting period ended
 *  endedProcessingAt {timestamptz} When the images were finished processing
 *  id {string} uuid for the bikeshed
 *  processingOutput {string} Any output text generated when processing, e.g. error messages
 *  requestId {string} uuid of the request which created this bikeshed
 *  startedAt {timestamptz} When the voting period started
 *  startedProcessingAt {timestamptz} When the images started being processed
 *  status {string} Processing and voting state
 *  title {string} Question or statement of what this bikeshed is for
 *  userId {string} user's uuid
 *  updatedAt {timestamptz} When it was last updated
 * Indexes:
 *  @TODO
 */
import { BIKESHED_STATUS } from 'bshed-constants'

export default function createBikeshed (models) {
  const Bikeshed = models.bookshelf.Model.extend({
    hasTimestamps: true,
    tableName: 'bikesheds',

    bikes () {
      return this.hasMany(models.Bike)
    },

    creator () {
      return this.belongsTo(models.User, 'user_id')
    },

    getAddBikeshedQueueData (bikes) {
      const bikeshedId = this.get('id')
      const requestId = this.get('requestId')
      const uploadLocation = this.getUploadLocation()
      const userId = this.get('userId')

      const files = bikes.map(bike => {
        const extension = bike.get('extension')
        const field = bike.get('field')
        return {
          // Image extension
          extension: extension,

          // Bike field (0, 1, 2, 3, 4, 5)
          field: field,

          // @TODO: Add /${field} and stop sending field
          // Global folder in which to save the output
          outputLocation: `bikesheds/${bikeshedId}`,

          // Where the specific bike was uploaded
          uploadLocation: `${uploadLocation}/${field}`
        }
      })

      return {
        bikeshedId,
        files,
        requestId,
        userId
      }
    },

    // Root location where this bikeshed got uploaded
    getUploadLocation () {
      const userId = this.get('userId')
      const requestId = this.get('requestId')
      return `uploads/images/${userId}/${requestId}`
    },

    async voteCount () {
      return await this.votes().count()
    },

    votes () {
      return this.hasMany(models.Vote)
    }
  }, {
    async updateBikeshedStatus ({ bikeshedId, error, result, status }) {
      return models.bookshelf.transaction(async t => {
        // List of promises we want to execute in a batch
        const promises = []

        // Get the props for the next status and the update promise
        const nextProps = Bikeshed.getNextStatusProps({ error, status })
        const bikeshedPromise = Bikeshed.where({
          id: bikeshedId
        }).save(nextProps, {
          method: 'update',
          patch: true,
          require: false,
          transacting: t
        })
        promises.push(bikeshedPromise)

        if (status === BIKESHED_STATUS.ACTIVE) {
          // Get the bike for a specific field, update its height and width
          result.forEach(({ file, height, width }) => {
            const bikePromise = models.Bike.where({
              bikeshed_id: bikeshedId,
              field: file.field
            }).save({
              height: height,
              width: width
            }, {
              method: 'update',
              patch: true,
              transacting: t
            })
            promises.push(bikePromise)
          })
        }

        // Execute the batched update promises
        await Promise.all(promises)

        const bikeshed = await Bikeshed.forge({
          id: bikeshedId
        }).fetch({
          transacting: t
        })

        return {
          bikeshed
        }
      })
    },

    getNextStatusProps ({ status, error }) {
      switch (status) {
        case BIKESHED_STATUS.ACTIVE:
          return {
            startedAt: new Date(),
            status,
            endedProcessingAt: new Date()
          }
        case BIKESHED_STATUS.ERROR:
          return {
            error,
            status,
            endedProcessingAt: new Date()
          }
        case BIKESHED_STATUS.PROCESSING:
          return {
            startedProcessingAt: new Date()
          }
        default:
          return {}
      }
    },

    async updateVoteStatus ({ bikeshedId }) {
      return models.bookshelf.transaction(async t => {
        return Bikeshed.where({
          id: bikeshedId
        }).save({
          endedAt: new Date(),
          status: BIKESHED_STATUS.CLOSED
        }, {
          method: 'update',
          patch: true,
          transacting: t
        })
      })
    }
  })

  return Bikeshed
}
