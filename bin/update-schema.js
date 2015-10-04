#!/usr/bin/env node -r babel/register
/**
 * Update schema.json and schema.graphql in bshed/data/
 * Usage:
 *  ./update-schema.js
 */
import fs from 'fs'
import path from 'path'
import { graphql } from 'graphql'
import loadModels from '@server/models'
import { database } from '@server/config'
import loadSchema from '@server/data/schema'
import { introspectionQuery, printSchema } from 'graphql/utilities'

export async function updateSchema () {
  const models = loadModels(database)
  const Schema = loadSchema(models)

  try {
    const result = await graphql(Schema, introspectionQuery)
    if (result.errors) {
      console.error(
        'ERROR introspecting schema:',
        JSON.stringify(result.errors, null, 2)
      )
      throw result.errors
    }

    await Promise.all([
      writeFilePromise(
        path.join(__dirname, '../server/data/schema.json'),
        JSON.stringify(result, null, 2)
      ),
      writeFilePromise(
        path.join(__dirname, '../server/data/schema.graphql'),
        printSchema(Schema)
      )
    ])
  } finally {
    await models.r.getPoolMaster().drain()
  }
}

if (require.main === module) {
  updateSchema()
  .then(
    () => console.log('finished'),
    (err) => console.error('error', err)
  )
}

function writeFilePromise (filePath, file) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, file, err => {
      err ? reject(err) : resolve()
    })
  })
}
