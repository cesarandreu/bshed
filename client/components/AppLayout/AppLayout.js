/**
 * AppLayout
 * @flow
 */
import React, { Component, PropTypes } from 'react'
import { Layout, LayoutContent, LayoutHeader } from '../Layout'

export default class AppLayout extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  }

  render () {
    const { children } = this.props

    return (
      <Layout>
        <LayoutHeader>
          HEADER~
        </LayoutHeader>
        <LayoutContent>
          {children}
        </LayoutContent>
      </Layout>
    )
  }
}

// export default Relay.createContainer(Layout, {
//   fragments: {
//     viewer: () => Relay.QL`
//       fragment on Viewer {
//         isRegistered,
//       }
//     `
//   }
// })
