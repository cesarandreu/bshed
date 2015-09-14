#!/usr/bin/env node -r babel/register

import webpackServerTestConfig from '../../config/webpack.serverTest.js'
import webpackRequire from 'webpack-require'
import path from 'path'

const input = process.argv[2]
if (!input) {
  throw new Error('Must pass a file name')
}
console.log(`input: ${input}`)

const resolvedInput = path.resolve(process.cwd(), input)
console.log(`resolved: ${resolvedInput}`)

const overrideModules = [
  'fs'
]

const globals = {
  clearTimeout: global.clearTimeout,
  setTimeout: global.setTimeout,
  console: global.console
}

webpackRequire(
  webpackServerTestConfig,
  resolvedInput,
  overrideModules,
  globals,
  (err, factory, stats, fs) => {
  if (err) {
    throw err
  }

  console.log('running')
  factory()
})
