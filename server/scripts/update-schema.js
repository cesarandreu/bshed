#!/usr/bin/env node -r babel/register

import fs from 'fs'
import path from 'path'
import { graphql } from 'graphql'
import loadModels from '../models'
import * as config from '../config'
import loadSchema from '../db/schema'
import { introspectionQuery, printSchema } from 'graphql/utilities'

export async function updateSchema () {
  const models = loadModels(config.database)
  const Schema = loadSchema(models)

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
      path.join(__dirname, '../db/schema.json'),
      JSON.stringify(result, null, 2)
    ),
    writeFilePromise(
      path.join(__dirname, '../db/schema.graphql'),
      printSchema(Schema)
    )
  ])
}

if (require.main === module) {
  updateSchema().then(
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
