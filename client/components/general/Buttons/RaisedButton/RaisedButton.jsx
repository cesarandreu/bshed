require('./RaisedButton.less')

import React, { PropTypes } from 'react'
import cn from 'classnames'
const ButtonLabel = require('../ButtonLabel')
const RectangleButton = require('../RectangleButton')
import ImmutableRenderMixin from 'react-immutable-render-mixin'

const RaisedButton = React.createClass({
  mixins: [
    ImmutableRenderMixin
  ],

  propTypes: {
    secondary: PropTypes.bool,
    primary: PropTypes.bool,
    label: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string
  },

  render () {
    const {label, primary, secondary, children, className, ...other} = this.props
    const buttonClassName = cn('raised-button', {
      'raised-button-secondary': secondary,
      'raised-button-primary': primary
    })

    return (
      <RectangleButton
        className={buttonClassName}
        {...other}
      >
        {label
          ? <ButtonLabel className='raised-button-label'>
              {label}
            </ButtonLabel>
          : children
        }
      </RectangleButton>
    )
  }
})

module.exports = RaisedButton
