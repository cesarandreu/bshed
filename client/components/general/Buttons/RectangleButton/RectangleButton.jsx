require('./RectangleButton.less')

import React, { PropTypes } from 'react'
import cn from 'classnames'
const EnhancedButton = require('../EnhancedButton')
import ImmutableRenderMixin from 'react-immutable-render-mixin'

const RectangleButton = React.createClass({
  mixins: [
    ImmutableRenderMixin
  ],

  propTypes: {
    className: PropTypes.string,
    children: PropTypes.node
  },

  render () {
    const { children, className, ...props } = this.props
    return (
      <EnhancedButton
        className={cn('rectangle-button', className)}
        {...props}
      >
        {children}
      </EnhancedButton>
    )
  }
})

module.exports = RectangleButton
