import './RaisedButton.less'
import cn from 'classnames'
import ButtonLabel from '../ButtonLabel'
import React, { PropTypes } from 'react'
import RectangleButton from '../RectangleButton'
import ImmutableRenderMixin from 'react-immutable-render-mixin'

const RaisedButton = React.createClass({
  mixins: [
    ImmutableRenderMixin
  ],

  propTypes: {
    label: PropTypes.string.isRequired,
    className: PropTypes.string,
    secondary: PropTypes.bool,
    primary: PropTypes.bool
  },

  render () {
    const { label, className, secondary, primary, ...other } = this.props
    const raisedButtonClassName = cn('raised-button', className, {
      'raised-button-secondary': secondary,
      'raised-button-primary': primary
    })

    return (
      <RectangleButton
        className={raisedButtonClassName}
        {...other}
      >
        <ButtonLabel className='raised-button-label'>
          {label}
        </ButtonLabel>
      </RectangleButton>
    )
  }
})

export default RaisedButton
