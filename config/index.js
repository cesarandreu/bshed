/**
 * Load configuration objects
 */
import path from 'path'
import * as databaseConfig from './database'
import * as redisConfig from './redis'
import * as awsConfig from './aws'

// Environment
export const env = process.env.NODE_ENV || 'development'

// Server
export const keys = ['keys']

// Database, Redis, AWS
export const database = databaseConfig[env]
export const redis = redisConfig[env]
export const aws = awsConfig[env]

// Assets path
export const ASSETS_PATH = path.resolve(__dirname, '../build/assets')

// Queue names
export const PROCESS_IMAGE_WORKER_QUEUE = 'PROCESS_IMAGE_WORKER_QUEUE'
export const IMAGE_UPDATES_WORKER_QUEUE = 'IMAGE_UPDATES_WORKER_QUEUE'
export const VOTE_UPDATES_WORKER_QUEUE = 'VOTE_UPDATES_WORKER_QUEUE'
