require('./Card.less')

import cn from 'classnames'
import React from 'react'
import ImmutableRenderMixin from 'react-immutable-render-mixin'

const Card = React.createClass({
  mixins: [
    ImmutableRenderMixin
  ],

  propTypes: {
    className: React.PropTypes.string,
    children: React.PropTypes.node,
    zDepth: React.PropTypes.number
  },

  getDefaultProps () {
    return {
      zDepth: 1
    }
  },

  render () {
    const { children, zDepth, className, ...props } = this.props
    return (
      <div
        className={cn(`card card-depth-${zDepth}`, className)}
        {...props}
      >
        {children}
      </div>
    )
  }

})

module.exports = Card
