/**
 * AppLayout
 * @flow
 */
import { Layout, LayoutContent, LayoutHeader, LayoutTitle } from '../Layout'
import React, { Component, PropTypes } from 'react'

export default class AppLayout extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  }

  render () {
    const { children } = this.props

    return (
      <Layout>
        <LayoutHeader>
          <LayoutTitle title='Bikeshed it!'/>
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
