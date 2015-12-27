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
    // connectionFields: {},
    // edgeFields: {},
    name: 'Bikeshed',
    nodeType: types.BikeshedType
    // resolveCursor () {},
    // resolveNode () {}
  })

  Object.assign(types, {
    BikeshedConnectionType,
    BikeshedEdgeType
  })
}
