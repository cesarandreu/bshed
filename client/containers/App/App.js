/**
 * App
 * @flow
 */
import '@components/styles/resets.css'
import { Layout, LayoutContent, LayoutHeader, LayoutTitle } from '@components/Layout'
import React, { Component, PropTypes } from 'react'
import Relay from 'react-relay'

export class App extends Component {
  render () {
    const { children, viewer } = this.props
    const { isRegistered, name } = viewer
    return (
      <Layout>
        <LayoutHeader>
          <LayoutTitle title='Bikeshed it!'/>
          <div>
            {isRegistered ? `${name}` : 'Y U NO REGISTER?'}
          </div>
        </LayoutHeader>
        <LayoutContent>
          {children}
        </LayoutContent>
      </Layout>
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
        isRegistered,
        name
      }
    `
  }
})
