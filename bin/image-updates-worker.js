#!/usr/bin/env node -r bshed-requires
/**
 * Image updates worker
 */
import Queue from 'bull'
import * as ImageUpdatesWorker from '../worker/image-updates'
import {
  database,
  IMAGE_UPDATES_WORKER_QUEUE,
  redis,
  VOTE_UPDATES_WORKER_QUEUE
} from '../config'
import createModels from '../server/models'

// Initialize queue
const { port, host, ...redisOptions } = redis
const imageUpdatesQueue = new Queue(IMAGE_UPDATES_WORKER_QUEUE, port, host, redisOptions)
const voteUpdatesQueue = new Queue(VOTE_UPDATES_WORKER_QUEUE, port, host, redisOptions)

// Initialize models
const models = createModels({ database })

// Initialize worker
ImageUpdatesWorker.initialize({
  imageUpdatesQueue,
  models,
  voteUpdatesQueue
})
