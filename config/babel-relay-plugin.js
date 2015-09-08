/**
 * Load and export graphql schema.json
 */
const getBabelRelayPlugin = require('babel-relay-plugin')
const schema = require('../server/db/schema.json')

module.exports = getBabelRelayPlugin(schema.data)
