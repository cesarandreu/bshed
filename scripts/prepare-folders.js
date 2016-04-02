#! /usr/bin/env node

/**
 * Clean up any residual files and create the build folders
 */
const config = require('server/config')
const sh = require('shelljs')

const bshedConfig = config.get('bshed')
sh.set('-e')

// Delete the build folder if it exists
// This lets us start with a clean slate
sh.rm('-rf', 'build')

// Create the assets folder for the compiled client
sh.mkdir('-p', 'build/client')

// Create the data folder for the compiled schema
sh.mkdir('-p', 'build/data')

// Create the fake s3 bucket folder
const bucket = bshedConfig.images.s3.bucket
sh.mkdir('-p', `build/s3/${bucket}`)
