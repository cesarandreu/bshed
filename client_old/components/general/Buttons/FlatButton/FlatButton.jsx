require('./FlatButton.less')

import React, { PropTypes } from 'react'
import cn from 'classnames'
const ButtonLabel = require('../ButtonLabel')
const RectangleButton = require('../RectangleButton')
import ImmutableRenderMixin from 'react-immutable-render-mixin'

const FlatButton = React.createClass({
  mixins: [
    ImmutableRenderMixin
  ],

  propTypes: {
    label: PropTypes.string,
    primary: PropTypes.bool,
    secondary: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.node
  },

  render () {
    const {label, primary, secondary, children, className, ...props} = this.props
    const buttonClassName = cn('flat-button', {
      'flat-button-secondary': secondary,
      'flat-button-primary': primary
    })

    return (
      <RectangleButton
        className={buttonClassName}
        {...props}
      >
        {label
          ? <ButtonLabel className='flat-button-label'>
              {label}
            </ButtonLabel>
          : children
        }
      </RectangleButton>
    )
  }
})

module.exports = FlatButton

