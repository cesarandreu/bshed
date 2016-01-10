#!/usr/bin/env node -r bshed-requires
// Update schema.json and schema.graphql in bshed/data/
import fs from 'fs'
import path from 'path'
import { graphql } from 'graphql'
import schema from '../server/schema'
import { introspectionQuery, printSchema } from 'graphql/utilities'

async function updateSchema () {
  console.log(`[update-schema]: Attempting to update schema.json and schema.graphql`)

  const result = await graphql(schema, introspectionQuery)
  if (result.errors) {
    throw new Error(JSON.stringify(result.errors, null, 2))
  }
  await Promise.all([
    writeFile(
      path.resolve(__dirname, '../data/schema.json'),
      JSON.stringify(result, null, 2)
    ),
    writeFile(
      path.resolve(__dirname, '../data/schema.graphql'),
      printSchema(schema)
    )
  ])
  return 'Updated schema.json and schema.graphql'
}

updateSchema()
.then(msg => {
  console.log(`[update-schema]: ${msg}`)
  process.exit(0)
})
.catch(err => {
  console.error(`[update-schema]: ${err.name}: ${err.message}`)
  process.exit(1)
})

function writeFile (filePath, file) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, file, err => {
      err ? reject(err) : resolve()
    })
  })
}
