#! /usr/bin/env node

/**
 * Create Postgres database
 */
const config = require('server/config')
const sh = require('shelljs')

const bshedConfig = config.get('bshed')
sh.set('-e')

if (!sh.which('createdb')) {
  sh.echo('Error: this script requires `createdb`')
  sh.exit(1)
}

const database = bshedConfig.drivers.pg.database
sh.echo(`Creating "${database}" database`)
sh.exec(`createdb ${database}`)
