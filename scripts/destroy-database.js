#! /usr/bin/env node

/**
 * Destroy Postgres database if it exist
 */
const sh = require('shelljs')
const config = require('server/config')

const bshedConfig = config.get('bshed')
sh.set('-e')

if (!sh.which('dropdb')) {
  sh.echo('Error: this script requires `dropdb`')
  sh.exit(1)
}

const database = bshedConfig.drivers.pg.database
sh.echo(`Destroying "${database}" database`)
sh.exec(`dropdb --if-exists ${config.get('bshed.drivers.pg.database')}`)
