import React, { Component, PropTypes } from 'react'
import Layout from '../../components/Layout'
import Navigate from '../Navigate'

export class LayoutContainer extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  }

  render () {
    return (
      <Navigate>
        <Layout {...this.props}/>
      </Navigate>
    )
  }
}

export default LayoutContainer
