#!/usr/bin/env node -r bshed/config/requires
/**
 * Process images worker
 */
import S3FS from 's3fs'
import Queue from 'bull'
import * as ProcessImagesWorker from 'bshed/worker/process-images'
import { aws, redis, PROCESS_IMAGE_WORKER_QUEUE } from 'bshed/config'

// Initialize queue
const { port, host, ...redisOptions } = redis
const processImageQueue = new Queue(PROCESS_IMAGE_WORKER_QUEUE, port, host, redisOptions)

// Initialize s3fs
const { bucket, ...awsOptions } = aws
const s3fs = new S3FS(bucket, awsOptions)

// Initialize worker
ProcessImagesWorker.initialize({
  processImageQueue,
  s3fs
})
