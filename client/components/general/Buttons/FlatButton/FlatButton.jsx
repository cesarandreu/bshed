require('./FlatButton.less')

const cn = require('classnames')
const React = require('react/addons')
const ButtonLabel = require('../ButtonLabel')
const PureRenderMixin = React.addons.PureRenderMixin
const RectangleButton = require('../RectangleButton')

const FlatButton = React.createClass({
  mixins: [
    PureRenderMixin
  ],

  propTypes: {
    label: React.PropTypes.string,
    primary: React.PropTypes.bool,
    secondary: React.PropTypes.bool
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

