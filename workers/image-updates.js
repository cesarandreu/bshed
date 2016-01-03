/**
 * Image updates
 * Responsible for updating each bikeshed while their images are processed
 */
import debug from 'debug'
import { pushVoteUpdate } from './vote-updates'
import { callDone, createJobStream } from './helpers'
import { BIKESHED_STATUS } from 'bshed-constants'

const log = debug('worker:imageUpdates')

export function initialize ({ imageUpdatesQueue, models, voteUpdatesQueue }) {
  log('initializing')

  imageUpdatesQueue
    .on('error', error => log('queue error', error))

  const imageUpdateStream = createImageUpdatesStream({
    imageUpdatesQueue,
    models,
    voteUpdatesQueue
  })
  imageUpdateStream.subscribe()

  log('ready')
}

// Creates a job stream to update each bikeshed's status as its images are processed
export function createImageUpdatesStream ({ imageUpdatesQueue, models, voteUpdatesQueue }) {
  async function updateBikeshedStatus ({ job }) {
    const { data, jobId } = job
    log(`processing jobId=${jobId}`)
    log(`data=${JSON.stringify(data, null, 2)}`)

    const result = await models.Bikeshed.updateBikeshedStatus(data)
    if (data.status === BIKESHED_STATUS.ACTIVE) {
      await pushVoteUpdate(voteUpdatesQueue, result)
    }
    return result
  }

  log('creating image updates stream')
  return createJobStream(imageUpdatesQueue)
    .flatMap(callDone(updateBikeshedStatus))
}

// Use this to add a status update to the queue
// @TODO: Document and validate queue data schema
export function pushImageUpdate (imageUpdatesQueue, { data, error, result, status }) {
  return imageUpdatesQueue.add({
    bikeshedId: data.bikeshedId,
    error,
    result,
    status
  }, {
    attempts: 5,
    backoff: {
      type: 'exponential'
    }
  })
}
