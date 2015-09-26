/**
 * App
 * @flow
 */
import '../styles/resets.css'
import Relay from 'react-relay'
import { AppLayout } from '../AppLayout'
import React, { Component, PropTypes } from 'react'

export class App extends Component {
  render () {
    const { children } = this.props

    return (
      <AppLayout>
        {children}
      </AppLayout>
    )
  }
}
App.propTypes = {
  viewer: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired
}

export const AppContainer = Relay.createContainer(App, {
  fragments: {
    viewer: () => Relay.QL`
      fragment App on User {
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
