#!/usr/bin/env node -r babel/register

/**
 * Image processing worker
 */
import * as config from '@server/config'
import { createJobConsumer } from '@server/lib/image-queue'
createJobConsumer(config.queue, config.aws)
