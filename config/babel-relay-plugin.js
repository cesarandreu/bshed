/**
 * Load and export graphql schema.json
 * Used to compile frontend code
 */
const getBabelRelayPlugin = require('babel-relay-plugin')
const schema = require('@server/data/schema.json')

module.exports = getBabelRelayPlugin(schema.data)
