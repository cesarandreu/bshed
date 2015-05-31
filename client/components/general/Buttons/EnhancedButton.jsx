require('./base-button.less')
require('./enhanced-button.less')

const cn = require('classnames')
const React = require('react/addons')
const PureRenderMixin = React.addons.PureRenderMixin

const EnhancedButton = React.createClass({
  mixins: [
    PureRenderMixin
  ],

  propTypes: {
    link: React.PropTypes.bool,
    onClick: React.PropTypes.func,
    primary: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    secondary: React.PropTypes.bool,
    className: React.PropTypes.string
  },

  render () {
    const {children, className, link, disabled, primary, secondary, ...other} = this.props

    const props = {
      ...other,
      disabled,
      onClick: this._onClick,
      className: cn('base-button', 'enhanced-button', className, {
        disabled, link, primary, secondary
      })
    }

    var enhancedButton
    if (link) {
      enhancedButton = disabled
        ? <div {...props}>{children}</div>
        : <a {...props}>{children}</a>
    } else {
      enhancedButton = <button {...props}>{children}</button>
    }

    return enhancedButton
  },

  _onClick (e) {
    if (!this.props.disabled && this.props.onClick)
      this.props.onClick(e)
  }
})

module.exports = EnhancedButton
