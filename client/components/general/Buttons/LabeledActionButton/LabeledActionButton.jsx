require('./LabeledActionButton.less')

import cn from 'classnames'
import React, { PropTypes } from 'react'
const ActionButton = require('../ActionButton')
import ImmutableRenderMixin from 'react-immutable-render-mixin'

// TODO: allow setting label position, currently sets position to the left
const LabeledActionButton = React.createClass({
  mixins: [
    ImmutableRenderMixin
  ],

  propTypes: {
    position: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
    label: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    className: PropTypes.string
  },

  getDefaultProps () {
    return {
      position: 'left'
    }
  },

  render () {
    const { label, className, position, ...props } = this.props
    return (
      <div className={cn('labeled-action-button', className, position)}>
        <ActionButton {...props}/>
        <label>{label}</label>
      </div>
    )
  }
})

module.exports = LabeledActionButton
