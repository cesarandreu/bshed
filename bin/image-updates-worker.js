#!/usr/bin/env node -r bshed-requires
/**
 * Image updates worker
 */
import models from '../server/models'
import queues from '../server/services/queues'
import { ImageUpdatesWorker } from 'bshed-workers'

// Initialize worker
ImageUpdatesWorker.initialize({
  models,
  queues
})
