import './Application.less'

import Layout from '../../components/Layout'
import React, { Component, PropTypes } from 'react'

export default class Application extends Component {
  static propTypes = {
    children: PropTypes.node
  }

  render () {
    const { children } = this.props

    return (
      <Layout>
        {children}
      </Layout>
    )
  }
}
