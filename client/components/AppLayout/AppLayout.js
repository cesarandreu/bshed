/**
 * AppLayout
 * @flow
 */
import { Layout, LayoutContent, LayoutHeader, LayoutTitle } from '../Layout'
import shouldPureComponentUpdate from 'react-pure-render/function'
import React, { Component, PropTypes } from 'react'

export class AppLayout extends Component {
  constructor (props: Object) {
    super(props)
    this.shouldComponentUpdate = shouldPureComponentUpdate
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
AppLayout.propTypes = {
  children: PropTypes.node.isRequired
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
