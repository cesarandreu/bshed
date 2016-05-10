/**
 * Queues
 * They all use redis, look at bull module for more information
 */
import Queue from 'bull'
import { redis } from '../../config'

// Export a singleton object with all the queues by default
export default {
  imageUpdates: createQueue('imageUpdates', redis),
  processImages: createQueue('processImages', redis),
  voteUpdates: createQueue('voteUpdates', redis)
}

// Create a queue instance
export function createQueue (queueName, { port, host, ...redisConfig }) {
  return new Queue(queueName, port, host, redisConfig)
}
