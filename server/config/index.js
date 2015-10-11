/**
 * Configuration loader
 */
import * as databaseConfig from './database'
import * as queueConfig from './queue'
import * as awsConfig from './aws'

export const env = process.env.NODE_ENV || 'development'
export const port = Number(process.env.PORT) || 3000
export const database = databaseConfig[env]
export const queue = queueConfig[env]
export const aws = awsConfig[env]
export const keys = ['keys']
