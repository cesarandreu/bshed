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
import loadModels from '@server/models'
import * as config from '@server/config'
console.log(`Loaded database config for "${config.env}" environment`)

// Perform the action
executeAction(process.argv[2])
async function executeAction (action) {
  try {
    const models = loadModels(config)
    switch (action) {
      case 'drop':
        await dropDatabase(models)
        break
      case 'create':
        await createDatabase(models)
        break
      case 'prepare':
        await createTables(models)
        break
      case 'reset':
        await dropDatabase(models)
        await createDatabase(models)
        await createTables(models)
        break
      default:
        throw new Error(`Unknown action "${action}"`)
    }
    await models.r.getPoolMaster().drain()
  } catch (err) {
    console.error(`Error executing action: ${err}`)
    process.exit(1)
  }
}

// ACTIONS
async function dropDatabase (models) {
  const { r } = models
  const list = await r.dbList()
  if (list.includes(config.database.db)) {
    try {
      console.log(`Dropping "${config.database.db}" database`)
      await r.dbDrop(config.database.db)
      console.log('Database dropped')
    } catch (err) {
      console.error(`Error dropping "${config.database.db}" database`)
      throw err
    }
  } else {
    console.log(`Unable to drop "${config.database.db}", it doesn't exist`)
  }
}

async function createDatabase (models) {
  const { r } = models
  const list = await r.dbList()
  if (!list.includes(config.database.db)) {
    try {
      console.log(`Creating "${config.database.db}" database`)
      await r.dbCreate(config.database.db)
      console.log('Database created')
    } catch (err) {
      console.error(`Error creating "${config.database.db}" database`)
      throw err
    }
  } else {
    console.log(`Unable to create "${config.database.db}", already exists`)
  }
}

async function createTables (models) {
  console.log(`Creating tables for "${config.database.db}" database`)
  const { instances } = models
  const instanceList = Object.values(instances)
  await Promise.all(instanceList.map(model => model.createTable()))
  await Promise.all(instanceList.map(model => model.createIndexes()))
  console.log(`Created tables and indexes`)
}
