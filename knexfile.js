const config = require('server/config')
const bshedConfig = config.get('bshed')

module.exports = {
  client: 'pg',
  connection: bshedConfig.drivers.pg,
  migration: {
    tableName: 'knex_migrations'
  }
}
