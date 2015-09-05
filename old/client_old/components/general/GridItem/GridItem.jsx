require('./GridItem.less')

import React, { PropTypes } from 'react'
import cn from 'classnames'
import ImmutableRenderMixin from 'react-immutable-render-mixin'

const GridItem = React.createClass({
  mixin: [
    ImmutableRenderMixin
  ],

  propTypes: {
    className: PropTypes.string,
    children: PropTypes.node,
    height: PropTypes.number,
    width: PropTypes.number
  },

  getDefaultProps () {
    return {
      height: 212,
      width: 212
    }
  },

  render () {
    const { children, className, height, width, ...props } = this.props
    return (
      <div
        style={{height, width}}
        className={cn('grid-item', className)}
        {...props}
      >
        {children}
      </div>
    )
  }
})

module.exports = GridItem
