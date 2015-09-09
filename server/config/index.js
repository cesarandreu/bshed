/**
 * Application configuration
 * @flow
 */
import * as db from './database'

export const env = process.env.NODE_ENV || 'development'
export const port = Number(process.env.PORT) || 3000
export const database = db[env]
