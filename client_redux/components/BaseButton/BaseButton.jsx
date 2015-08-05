import './BaseButton.less'

import cn from 'classnames'
import React, { PropTypes } from 'react'
import ImmutableRenderMixin from 'react-immutable-render-mixin'

const BaseButton = React.createClass({
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
      <button
        className={cn('base-button', className)}
        {...props}
      >
        {children}
      </button>
    )
  }
})

module.exports = BaseButton
