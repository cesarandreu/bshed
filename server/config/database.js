/**
 * Database configuration
 * @flow
 */
export const development = {
  username: null,
  password: null,
  database: 'app_development',
  host: '127.0.0.1',
  dialect: 'postgres'
}

export const test = {
  username: null,
  password: null,
  database: 'app_test',
  host: '127.0.0.1',
  dialect: 'postgres',
  logging: false
}

export const production = {
  username: null,
  password: null,
  database: 'app',
  host: '127.0.0.1',
  dialect: 'postgres',
  logging: false
}
