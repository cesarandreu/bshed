require('./ButtonLabel.less')

import cn from 'classnames'
import React, { PropTypes } from 'react'
import ImmutableRenderMixin from 'react-immutable-render-mixin'

const ButtonLabel = React.createClass({
  mixins: [
    ImmutableRenderMixin
  ],

  propTypes: {
    className: PropTypes.string,
    children: PropTypes.node
  },

  render () {
    const {className, children, ...props} = this.props
    return (
      <span
        className={cn('button-label', className)}
        {...props}
      >
        {children}
      </span>
    )
  }
})

module.exports = ButtonLabel
