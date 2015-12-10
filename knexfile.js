module.exports = {
  development: {
    client: 'pg',
    connection: {
      database: 'bshed_development',
      host: '127.0.0.1',
      port: '5432',
      user: 'root'
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      tableName: 'knex_migrations'
    }
  },
  test: {
    client: 'pg',
    connection: {
      database: 'bshed_test',
      host: '127.0.0.1',
      port: '5432',
      user: 'root'
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
}
