module.exports = {
  development: {
    username: null,
    password: null,
    database: 'bshed_development',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  test: {
    username: null,
    password: null,
    database: 'bshed_test',
    host: '127.0.0.1',
    dialect: 'postgres',
    logging: false
  },
  production: {
    username: null,
    password: null,
    database: 'bshed_production',
    host: '127.0.0.1',
    dialect: 'postgres'
  }
}
