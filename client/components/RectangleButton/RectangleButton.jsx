import './RectangleButton.less'

import cn from 'classnames'
import BaseButton from '../BaseButton'
import React, { PropTypes } from 'react'
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
    const { children, className, ...other } = this.props

    return (
      <BaseButton
        className={cn('rectangle-button', className)}
        {...other}
      >
        {children}
      </BaseButton>
    )
  }
})

export default RectangleButton
