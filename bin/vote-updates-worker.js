#!/usr/bin/env node -r bshed-requires
/**
 * Vote updates worker
 */
import Queue from 'bull'
import { VoteUpdatesWorker } from 'bshed-workers'
import {
  database,
  redis,
  VOTE_UPDATES_WORKER_QUEUE
} from '../config'
import createModels from '../server/models'

// Initialize queue
const { port, host, ...redisOptions } = redis
const voteUpdatesQueue = new Queue(VOTE_UPDATES_WORKER_QUEUE, port, host, redisOptions)

// Initialize models
const models = createModels({ database })

// Initialize worker
VoteUpdatesWorker.initialize({
  models,
  voteUpdatesQueue
})
