#!/usr/bin/env node -r bshed-requires
/**
 * Vote updates worker
 */
import models from '../server/models'
import queues from '../server/services/queues'
import { VoteUpdatesWorker } from 'bshed-workers'

// Initialize worker
VoteUpdatesWorker.initialize({
  models,
  queues
})
