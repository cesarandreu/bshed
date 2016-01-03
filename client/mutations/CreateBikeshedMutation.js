/**
 * Create Bikeshed Mutation
 */
import Relay from 'react-relay'

export class CreateBikeshedMutation extends Relay.Mutation {
  getMutation () {
    return Relay.QL`mutation{ createBikeshed }`
  }

  getVariables () {
    const { duration, title } = this.props
    return {
      duration,
      title
    }
  }

  // We create a new global.File per file to change the name
  getFiles () {
    const { images } = this.props
    return images.reduce((files, { file, name }, idx) => {
      files[idx] = new global.File([file], name || file.name, {
        type: file.type
      })
      return files
    }, {})
  }

  getFatQuery () {
    return Relay.QL`
      fragment on CreateBikeshedPayload {
        bikeshed
      }
    `
  }

  getConfigs () {
    return [{
      type: 'REQUIRED_CHILDREN',
      children: [Relay.QL`
        fragment on CreateBikeshedPayload {
          bikeshed
        }`]
    }]
  }
}
