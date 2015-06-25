require('./DialogPart.less')

import React from 'react'
import cn from 'classnames'
import ImmutableRenderMixin from 'react-immutable-render-mixin'

const DialogPart = React.createClass({
  mixins: [
    ImmutableRenderMixin
  ],

  propTypes: {
    type: React.PropTypes.oneOf(['header', 'body', 'footer']).isRequired,
    className: React.PropTypes.string,
    children: React.PropTypes.node
  },

  render () {
    const { children, className, type } = this.props
    return (
      <div className={cn(`dialog-${type}`, className)}>
        {children}
      </div>
    )
  }
})

module.exports = DialogPart
