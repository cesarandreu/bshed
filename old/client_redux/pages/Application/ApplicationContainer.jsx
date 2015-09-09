import React, { Component, PropTypes } from 'react'
import Application from './Application'

export default class ApplicationContainer extends Component {
  static propTypes = {
    children: PropTypes.node
  }

  render () {
    const { children } = this.props
    return (
      <Application>
        {children}
      </Application>
    )
  }
}
