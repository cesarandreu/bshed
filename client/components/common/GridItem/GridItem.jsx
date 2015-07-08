import './GridItem.less'
import cn from 'classnames'
import React, { PropTypes } from 'react'
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
      height: 128,
      width: 128
    }
  },

  render () {
    const { children, className, height, width, ...other } = this.props

    return (
      <div
        style={{height, width}}
        className={cn('grid-item', className)}
        {...other}
      >
        {children}
      </div>
    )
  }
})

export default GridItem
