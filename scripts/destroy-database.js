#!/usr/bin/env node -r bshed-requires

// Destroy Postgres database if it exist
import childProcess from 'child_process'
import { database } from '../config'

const databaseName = database.connection.database
console.log(`[destroy-database]: "${databaseName}" database`)
childProcess.exec(`dropdb --if-exists ${databaseName}`, (err, stdout, stderr) => {
  if (stdout) {
    console.log(stdout.trim())
  }
  if (stderr) {
    console.log(stderr.trim())
  }
  process.exit(err ? 1 : 0)
})
