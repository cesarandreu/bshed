#!/usr/bin/env node -r lib/requires
/**
 * Image updates worker
 */
import models from 'server/models'
import queues from 'server/services/queues'
import { ImageUpdatesWorker } from 'workers'

// Initialize worker
ImageUpdatesWorker.initialize({
  models,
  queues
})
