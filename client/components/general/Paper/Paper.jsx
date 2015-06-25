require('./Paper.less')

import cn from 'classnames'
import React, { PropTypes } from 'react'
import ImmutableRenderMixin from 'react-immutable-render-mixin'

const Paper = React.createClass({
  mixins: [
    ImmutableRenderMixin
  ],

  propTypes: {
    zDepth: PropTypes.number,
    children: PropTypes.node,
    className: PropTypes.string
  },

  getDefaultProps () {
    return {
      zDepth: 1
    }
  },

  render () {
    const {zDepth, children, className, ...props} = this.props
    return (
      <div
        className={cn(`paper paper-depth-${zDepth}`, className)}
        {...props}
      >
        {children}
      </div>
    )
  }
})

module.exports = Paper
