import './RegularView.less'
import cn from 'classnames'
import React, { PropTypes } from 'react'
import ImmutableRenderMixin from 'react-immutable-render-mixin'

const RegularView = React.createClass({
  mixins: [
    ImmutableRenderMixin
  ],

  propTypes: {
    children: PropTypes.node.isRequired,
    className: PropTypes.string
  },

  render () {
    const { children, className } = this.props

    return (
      <div className={cn('regular-view', className)}>
        {children}
      </div>
    )
  }
})

export default RegularView
