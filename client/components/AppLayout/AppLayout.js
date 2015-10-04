/**
 * AppLayout
 * @flow
 */
import { Layout, LayoutContent, LayoutHeader, LayoutTitle } from '../Layout'
import React, { Component, PropTypes } from 'react'
import Relay from 'react-relay'

export class AppLayout extends Component {
  render () {
    const { children, user } = this.props
    return (
      <Layout>
        <LayoutHeader>
          <LayoutTitle title='Bikeshed it!'/>
          <div>
            {user.isRegistered ? `${user.name}` : 'Y U NO REGISTER?'}
          </div>
        </LayoutHeader>
        <LayoutContent>
          {children}
        </LayoutContent>
      </Layout>
    )
  }
}
AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
  user: PropTypes.object.isRequired
}
export const AppLayoutContainer = Relay.createContainer(AppLayout, {
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        isRegistered,
        name
      }
    `
  }
})
