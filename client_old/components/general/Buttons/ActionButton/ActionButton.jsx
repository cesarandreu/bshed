require('./ActionButton.less')

import React, { PropTypes } from 'react'
import cn from 'classnames'
const IconButton = require('../IconButton')
import ImmutableRenderMixin from 'react-immutable-render-mixin'

const ActionButton = React.createClass({
  mixins: [
    ImmutableRenderMixin
  ],

  propTypes: {
    icon: PropTypes.string.isRequired,
    className: PropTypes.string
  },

  render () {
    const { className, icon, ...props } = this.props
    return (
      <IconButton
        className={cn('action-button', className)}
        icon={icon}
        {...props}
      />
    )
  }
})

module.exports = ActionButton
