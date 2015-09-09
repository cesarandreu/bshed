/**
 * Database configuration
 * This is using CommonJS exports instead of ES6 modules because it needs to
 * work with sequelize-cli.
 * @flow
 */
exports.development = {
  username: null,
  password: null,
  database: 'app_development',
  host: '127.0.0.1',
  dialect: 'postgres'
}

exports.test = {
  username: null,
  password: null,
  database: 'app_test',
  host: '127.0.0.1',
  dialect: 'postgres',
  logging: false
}

exports.production = {
  username: null,
  password: null,
  database: 'app',
  host: '127.0.0.1',
  dialect: 'postgres',
  logging: false
}
