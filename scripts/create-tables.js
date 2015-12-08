#!/usr/bin/env node -r bshed/config/requires
// Create RethinkDB tables and indexes if they don't exist
import * as models from 'bshed/server/models'
const { getModels, TABLES, INDEXES } = models

async function createTables () {
  const { r } = getModels()
  console.log(`[create-tables]: Attempting to create tables`)
  const tableList = await r.tableList()
  await Promise.all(TABLES.map(async (table) => {
    if (tableList.includes(table)) {
      console.log(`[create-tables]: Table "${table}" already exists`)
    } else {
      await r.tableCreate(table)
      console.log(`[create-tables]: Table "${table}" created`)
    }
  }))

  console.log(`[create-tables]: Attempting to create indexes`)
  await Promise.all(Object.entries(INDEXES).map(async ([table, indexes]) => {
    const indexList = await r.table(table).indexList()
    await Promise.all(Object.entries(indexes).map(async ([indexName, indexValue]) => {
      if (indexList.includes(indexName)) {
        console.log(`[create-tables]: Index "${indexName}" for table "${table}" already exists`)
      } else {
        const type = typeof indexValue
        switch (type) {
          case 'string':
            await r.table(table).indexCreate(indexValue)
            break
          case 'function':
            await indexValue(r)
            break
          default:
            throw new Error(
              `Unexpected index "${indexName}" with type "${type}" on table "${table}"`
            )
        }
        console.log(`[create-tables]: Index "${indexName}" for table "${table}" created`)
      }
    }))
  }))

  return 'Finished creating tables and indexes'
}

createTables()
.then(msg => {
  console.log(`[create-tables]: ${msg}`)
  process.exit(0)
})
.catch(err => {
  console.error(`[create-tables]: ${err.name}: ${err.message}`, err)
  process.exit(1)
})
