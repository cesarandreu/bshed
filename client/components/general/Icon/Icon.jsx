require('./Icon.less')

import cn from 'classnames'
import React, { PropTypes } from 'react'
import ImmutableRenderMixin from 'react-immutable-render-mixin'

const Icon = React.createClass({
  mixins: [
    ImmutableRenderMixin
  ],

  propTypes: {
    icon: PropTypes.string.isRequired,
    className: PropTypes.string
  },

  render () {
    const {className, icon, ...other} = this.props
    return (
      <span
        className={cn('icon', icon, className, {md: !icon.indexOf('md')})}
        {...other}
      />
    )
  }
})

module.exports = Icon
