/**
 * Vote updates
 * Responsible for closing each bikeshed when their duration is up
 */
import Joi from 'joi'
import debug from 'debug'
import { callDone, createJobStream } from './helpers'

const log = debug('worker:voteUpdates')

export function initialize ({ models, voteUpdatesQueue }) {
  log('initializing')

  voteUpdatesQueue
    .on('error', error => log('queue error', error))

  const voteUpdateStream = createVoteUpdatesStream({
    models,
    voteUpdatesQueue
  })
  voteUpdateStream.subscribe()

  log('ready')
}

// Creates a job stream to update each bikeshed's status to closed
export function createVoteUpdatesStream ({ models, voteUpdatesQueue }) {
  async function updateBikeshedVoteStatus ({ job }) {
    const { data, jobId } = job
    log(`processing jobId=${jobId}`)
    await models.Bikeshed.updateVoteStatus(data)
    return data
  }

  log('creating vote updates stream')
  return createJobStream(voteUpdatesQueue)
    .flatMap(callDone(updateBikeshedVoteStatus))
}

const PUSH_VOTE_UPDATE_SCHEMA = Joi.object({
  bikeshedId: Joi.string().guid().required(),
  duration: Joi.number().integer().positive().required()
})

// Use this to push vote updates to the queue
export function pushVoteUpdate (voteUpdatesQueue, { bikeshed }) {
  const { bikeshedId, duration } = Joi.attempt({
    bikeshedId: bikeshed.get('id'),
    duration: bikeshed.get('duration')
  }, PUSH_VOTE_UPDATE_SCHEMA)

  const delay = minutesToMilliseconds(duration)
  return voteUpdatesQueue.add({ bikeshedId }, {
    attempts: 5,
    delay: delay,
    backoff: {
      type: 'exponential'
    }
  })
}

function minutesToMilliseconds (minutes) {
  return minutes * 60e3
}
