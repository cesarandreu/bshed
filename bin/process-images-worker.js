#!/usr/bin/env node -r bshed-requires
/**
 * Process images worker
 */
import queues from '../server/services/queues'
import s3fs from '../server/services/s3fs'
import { ProcessImagesWorker } from 'bshed-workers'

// Initialize worker
ProcessImagesWorker.initialize({
  queues,
  s3fs
})
