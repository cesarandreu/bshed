#!/usr/bin/env node -r lib/requires
/**
 * Vote updates worker
 */
import models from 'server/models'
import queues from 'server/services/queues'
import { VoteUpdatesWorker } from 'workers'

// Initialize worker
VoteUpdatesWorker.initialize({
  models,
  queues
})
