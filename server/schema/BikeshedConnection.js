/**
 * BikeshedConnection
 */
import {
  connectionDefinitions
} from 'graphql-relay'

export default function getBikeshedConnection ({ types }) {
  const {
    connectionType: BikeshedConnectionType,
    edgeType: BikeshedEdgeType
  } = connectionDefinitions({
    name: 'Bikeshed',
    nodeType: types.BikeshedType
  })
  Object.assign(types, {
    BikeshedConnectionType,
    BikeshedEdgeType
  })
}
