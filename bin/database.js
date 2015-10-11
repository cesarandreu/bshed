#!/usr/bin/env node -r babel/register
/**
 * Database scripts
 * Usage:
 *  ./database.js [action]
 * Available actions:
 *  create - create the NODE_ENV database
 *  drop - drop the NODE_ENV database
 *  prepare - create missing tables for NODE_ENV database
 *  reset - drop, create, and prepare the NODE_ENV database
 * Example:
 *  NODE_ENV=test ./database.js refresh
 */
import RethinkDB from 'rethinkdbdash'
import { database, env } from '@server/config'
import { instantiateModels } from '@server/models'
console.log(`Loaded database config for "${env}" environment`)

// Perform the action
executeAction(process.argv[2])
async function executeAction (action) {
  try {
    const r = RethinkDB(database)
    switch (action) {
      case 'drop':
        await dropDatabase(r)
        break
      case 'create':
        await createDatabase(r)
        break
      case 'prepare':
        await createTables(r)
        break
      case 'reset':
        await dropDatabase(r)
        await createDatabase(r)
        await createTables(r)
        break
      default:
        throw new Error(`Unknown action "${action}"`)
    }
    await r.getPoolMaster().drain()
  } catch (err) {
    console.error(`Error executing action: ${err}`)
    process.exit(1)
  }
}

// ACTIONS
async function dropDatabase (r) {
  const list = await r.dbList()
  if (list.includes(database.db)) {
    try {
      console.log(`Dropping "${database.db}" database`)
      await r.dbDrop(database.db)
      console.log('Database dropped')
    } catch (err) {
      console.error(`Error dropping "${database.db}" database`)
      throw err
    }
  } else {
    console.log(`Unable to drop "${database.db}", it doesn't exist`)
  }
}

async function createDatabase (r) {
  const list = await r.dbList()
  if (!list.includes(database.db)) {
    try {
      console.log(`Creating "${database.db}" database`)
      await r.dbCreate(database.db)
      console.log('Database created')
    } catch (err) {
      console.error(`Error creating "${database.db}" database`)
      throw err
    }
  } else {
    console.log(`Unable to create "${database.db}", already exists`)
  }
}

async function createTables (r) {
  console.log(`Creating tables for "${database.db}" database`)
  const instances = instantiateModels(r)
  const instanceList = Object.values(instances)
  await Promise.all(instanceList.map(model => model.createTable()))
  await Promise.all(instanceList.map(model => model.createIndexes()))
  console.log(`Created tables and indexes`)
}
