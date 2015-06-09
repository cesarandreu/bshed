require('./RaisedButton.less')

const cn = require('classnames')
const React = require('react/addons')
const ButtonLabel = require('../ButtonLabel')
const RectangleButton = require('../RectangleButton')
const ImmutableRenderMixin = require('react-immutable-render-mixin')

const RaisedButton = React.createClass({
  mixins: [
    ImmutableRenderMixin
  ],

  propTypes: {
    label: React.PropTypes.string,
    primary: React.PropTypes.bool,
    secondary: React.PropTypes.bool
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
