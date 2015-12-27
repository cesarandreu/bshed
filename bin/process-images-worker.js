#!/usr/bin/env node -r bshed-requires
/**
 * Process images worker
 */
import S3FS from 's3fs'
import Queue from 'bull'
import * as ProcessImagesWorker from '../worker/process-images'
import {
  aws,
  IMAGE_UPDATES_WORKER_QUEUE,
  redis,
  PROCESS_IMAGE_WORKER_QUEUE
} from '../config'

// Initialize queue
const { port, host, ...redisOptions } = redis
const processImageQueue = new Queue(PROCESS_IMAGE_WORKER_QUEUE, port, host, redisOptions)
const imageUpdatesQueue = new Queue(IMAGE_UPDATES_WORKER_QUEUE, port, host, redisOptions)

// Initialize s3fs
const { bucket, ...awsOptions } = aws
const s3fs = new S3FS(bucket, awsOptions)

// Initialize worker
ProcessImagesWorker.initialize({
  imageUpdatesQueue,
  processImageQueue,
  s3fs
})
