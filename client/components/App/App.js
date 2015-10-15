/**
 * App
 * @flow
 */
import '@components/styles/resets.css'
import { AppLayoutContainer } from '@components/AppLayout'
import React, { Component, PropTypes } from 'react'
import Relay from 'react-relay'

export class App extends Component {
  render () {
    const { children, viewer } = this.props
    return (
      <AppLayoutContainer
        user={viewer}
      >
        {children}
      </AppLayoutContainer>
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
        ${AppLayoutContainer.getFragment('user')}
      }
    `
  }
})
