/**
 * BodyPortal
 * @flow
 */
import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'

export class BodyPortal extends Component {
  _renderPortal () {
    const { children } = this.props
    const content = children ? React.Children.only(children) : null

    if (children != null) {
      if (!this._target) {
        this._target = document.createElement('div')
        document.body.appendChild(this._target)
      }
      this._instance = ReactDOM.unstable_renderSubtreeIntoContainer(this, content, this._target)
    } else {
      this.componentWillUnmount()
    }
  }

  componentWillUnmount () {
    if (this._target) {
      // Remove _instance
      ReactDOM.unmountComponentAtNode(this._target)
      this._instance = null

      // Remove _target
      document.body.removeChild(this._target)
      this._target = null
    }
  }

  componentDidMount () {
    this._renderPortal()
  }

  componentDidUpdate () {
    this._renderPortal()
  }

  render () {
    return null
  }
}

BodyPortal.propTypes = {
  children: PropTypes.node
}
