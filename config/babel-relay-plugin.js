/**
 * Load graphql schema and export the babel relay plugin
 * Used to compile frontend code
 */
import schema from '../data/schema.json'
import getBabelRelayPlugin from 'babel-relay-plugin'

export default getBabelRelayPlugin(schema.data)
