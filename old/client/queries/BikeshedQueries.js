import Relay from 'react-relay'

export default {
  bikeshed: () => Relay.QL`query { node(id: $bikeshedId) }`
}
