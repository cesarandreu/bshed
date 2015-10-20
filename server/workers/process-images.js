#!/usr/bin/env node -r babel/register

/**
 * Image processing worker
 */
import * as config from '@server/config'
import { getWorkerImageQueue } from '@server/lib/image-queue'
const workerImageQueue = getWorkerImageQueue(config.redis, config.aws)
workerImageQueue.start()
