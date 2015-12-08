/**
 * Load configuration objects
 */
import path from 'path'
import * as rethinkdbConfig from './rethinkdb'
import * as redisConfig from './redis'
import * as awsConfig from './aws'

// Environment
export const env = process.env.NODE_ENV || 'development'

// Server
export const keys = ['keys']

// RethinkDB, Redis, AWS
export const rethinkdb = rethinkdbConfig[env]
export const redis = redisConfig[env]
export const aws = awsConfig[env]

// Assets path
export const assetsPath = path.resolve(__dirname, '../build/assets')

// Image root url
// export const imageRoot = `//localhost:10001/${aws.bucket}`

// Queue names
export const PROCESS_IMAGE_WORKER_QUEUE = 'PROCESS_IMAGE_WORKER_QUEUE'
export const IMAGE_UPDATE_WORKER_QUEUE = 'IMAGE_UPDATE_WORKER_QUEUE'
