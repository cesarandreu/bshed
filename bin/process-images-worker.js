#!/usr/bin/env node -r lib/requires
/**
 * Process images worker
 */
import queues from 'server/services/queues'
import s3fs from 'server/services/s3fs'
import { ProcessImagesWorker } from 'workers'

// Initialize worker
ProcessImagesWorker.initialize({
  queues,
  s3fs
})
