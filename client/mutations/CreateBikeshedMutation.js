/**
 * Create Bikeshed Mutation
 * @flow
 */
import Relay from 'react-relay'
const { File } = global

export class CreateBikeshedMutation extends Relay.Mutation {
  getMutation () {
    return Relay.QL`mutation{ createBikeshed }`
  }

  getVariables (): { description: string } {
    const { description } = this.props
    return {
      description
    }
  }

  getFiles (): { [key: string]: File } {
    const { files } = this.props
    return files.reduce((fileMap, file, idx) => {
      fileMap[`image${idx}`] = file
      return fileMap
    }, {})
  }

  getFatQuery () {
    return Relay.QL`
      fragment on CreateBikeshedPayload {
        bikeshedEdge,
        viewer {
          bikesheds
        }
      }
    `
  }

  getConfigs (): Array<Object> {
    return [{
      type: 'REQUIRED_CHILDREN',
      children: [Relay.QL`
        fragment on CreateBikeshedPayload {
          bikeshedEdge
        }
      `]
    }, {
      type: 'RANGE_ADD',
      parentName: 'viewer',
      parentID: this.props.viewer.id,
      connectionName: 'bikesheds',
      edgeName: 'bikeshedEdge',
      rangeBehaviors: {
        '': 'append'
      }
    }]
  }
}

CreateBikeshedMutation.fragments = {
  viewer () {
    return Relay.QL`
      fragment on User {
        id
      }
    `
  }
}
