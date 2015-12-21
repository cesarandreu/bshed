#!/usr/bin/env node -r bshed-requires

// Create Postgres database unless it exists
import childProcess from 'child_process'
import { database } from '../config'

const databaseName = database.connection.database
console.log(`[create-database]: "${databaseName}" database`)
childProcess.exec(`createdb ${databaseName}`, (err, stdout, stderr) => {
  if (stdout) {
    console.log(stdout.trim())
  }
  if (stderr) {
    console.log(stderr.trim())
  }
  process.exit(err ? 1 : 0)
})
