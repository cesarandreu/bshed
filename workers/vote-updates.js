/**
 * Vote updates
 * Responsible for closing each bikeshed when their duration is up
 */
import Joi from 'joi'
import debug from 'debug'
import { callDone, createJobStream } from './helpers'

const log = debug('worker:voteUpdates')

export function initialize ({ models, queues }) {
  log('initializing')
  const { voteUpdates } = queues

  voteUpdates
    .on('error', error => log('queue error', error))

  const voteUpdateStream = createVoteUpdatesStream({
    models,
    voteUpdates
  })
  voteUpdateStream.subscribe()

  log('ready')
}

// Creates a job stream to update each bikeshed's status to closed
export function createVoteUpdatesStream ({ models, voteUpdates }) {
  async function updateBikeshedVoteStatus ({ job }) {
    const { data, jobId } = job
    log(`processing jobId=${jobId}`)
    await models.Bikeshed.updateVoteStatus(data)
    return data
  }

  log('creating vote updates stream')
  return createJobStream(voteUpdates)
    .flatMap(callDone(updateBikeshedVoteStatus))
}

const PUSH_VOTE_UPDATE_SCHEMA = Joi.object({
  bikeshedId: Joi.string().guid().required(),
  duration: Joi.number().integer().positive().required()
})

// Use this to push vote updates to the queue
export function pushVoteUpdate (voteUpdates, { bikeshed }) {
  const { bikeshedId, duration } = Joi.attempt({
    bikeshedId: bikeshed.get('id'),
    duration: bikeshed.get('duration')
  }, PUSH_VOTE_UPDATE_SCHEMA)

  const delay = minutesToMilliseconds(duration)
  return voteUpdates.add({ bikeshedId }, {
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
