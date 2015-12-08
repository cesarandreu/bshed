#!/usr/bin/env node -r bshed/config/requires
// Create RethinkDB database if it doesn't exist
import * as config from 'bshed/config'
import { getModels } from 'bshed/server/models'
const { rethinkdb } = config

async function createDatabase () {
  const { r } = getModels()
  console.log(`[create-database]: Attempting to create "${rethinkdb.db}" database`)

  const list = await r.dbList()
  if (list.includes(rethinkdb.db)) {
    return `Database "${rethinkdb.db}" already exists`
  } else {
    await r.dbCreate(rethinkdb.db)
    return `Database "${rethinkdb.db}" created`
  }
}

createDatabase()
.then(msg => {
  console.log(`[create-database]: ${msg}`)
  process.exit(0)
})
.catch(err => {
  console.error(`[create-database]: ${err.name}: ${err.message}`)
  process.exit(1)
})
