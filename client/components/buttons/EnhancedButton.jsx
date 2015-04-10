var React = require('react/addons'),
  classnames = require('classnames'),
  PureRenderMixin = React.addons.PureRenderMixin

var EnhancedButton = React.createClass({
  mixins: [PureRenderMixin],

  propTypes: {
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    link: React.PropTypes.bool,
    onClick: React.PropTypes.func
  },

  render: function () {
    var {children, className, link, disabled, ...other} = this.props
    className = classnames('base-button', 'enhanced-button', className, {disabled, link})

    var props = {
      ...other, disabled, className,
      onClick: this._onClick
    }

    var enhancedButton
    if (disabled && link) {
      enhancedButton = <span {...other} className={className} disabled={disabled}>{children}</span>
    } else if (link) {
      enhancedButton = <a {...props}>{children}</a>
    } else {
      enhancedButton = <button {...props}>{children}</button>
    }

    return enhancedButton
  },

  _onClick: function (e) {
    if (!this.props.disabled && this.props.onClick)
      this.props.onClick(e)
  }
})

module.exports = EnhancedButton
