/**
 * App
 * @flow
 */
import '../styles/resets.css'
import Relay from 'react-relay'
import { Display } from '../Text'
import AppLayout from '../AppLayout'
import React, { Component, PropTypes } from 'react'

export class App extends Component {
  static propTypes = {
    viewer: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired
  }

  render () {
    const { viewer, children } = this.props
    return (
      <AppLayout>
        <Display>Bikeshed list</Display>
        <ul>
          {viewer.bikesheds.edges.map(edge =>
            <li key={edge.node.id}>
              Creator: {edge.node.creator.name} (ID: {edge.node.id})
            </li>
          )}
        </ul>
        {children}
      </AppLayout>
    )
  }
}

export default Relay.createContainer(App, {
  fragments: {
    viewer: () => Relay.QL`
      fragment App on Viewer {
        bikesheds(first: 10) {
          edges {
            node {
              id,
              description,
              creator {
                id,
                name,
              }
            }
          }
        }
      }
    `
  }
})
// ${Layout.getFragment('viewer')},
