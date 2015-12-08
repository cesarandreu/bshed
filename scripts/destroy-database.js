#!/usr/bin/env node -r bshed/config/requires
// Destroy RethinkDB if it exists
import * as config from 'bshed/config'
import { getModels } from 'bshed/server/models'
const { rethinkdb } = config

async function destroyDatabase () {
  const { r } = getModels()
  console.log(`[destroy-database]: Attempting to destroy "${rethinkdb.db}" database`)

  const list = await r.dbList()
  if (list.includes(rethinkdb.db)) {
    await r.dbDrop(rethinkdb.db)
    return `Destroyed "${rethinkdb.db}" database`
  } else {
    return `Database "${rethinkdb.r}" doesn't exist`
  }
}

destroyDatabase()
.then(msg => {
  console.log(`[destroy-database]: ${msg}`)
  process.exit(0)
})
.catch(err => {
  console.error(`[destroy-database]: ${err.name}: ${err.message}`)
  process.exit(1)
})
