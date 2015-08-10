import React, { Component, PropTypes } from 'react'

export default class Layout extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  }

  render () {
    const { children } = this.props

    return (
      <div>
        {children}
      </div>
    )
  }
}
