require('./IconButton.less')

import React, { PropTypes } from 'react'
import cn from 'classnames'
const Icon = require('../../Icon')
const EnhancedButton = require('../EnhancedButton')
import ImmutableRenderMixin from 'react-immutable-render-mixin'

const IconButton = React.createClass({
  mixins: [
    ImmutableRenderMixin
  ],

  propTypes: {
    icon: PropTypes.string.isRequired,
    className: PropTypes.string
  },

  render () {
    const {icon, className, ...props} = this.props
    return (
      <EnhancedButton
        className={cn('icon-button', className)}
        {...props}
      >
        <Icon icon={icon}/>
      </EnhancedButton>
    )
  }
})

module.exports = IconButton
