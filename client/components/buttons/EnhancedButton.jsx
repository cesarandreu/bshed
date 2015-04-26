var React = require('react/addons'),
  classnames = require('classnames'),
  PureRenderMixin = React.addons.PureRenderMixin

var EnhancedButton = React.createClass({
  mixins: [PureRenderMixin],

  propTypes: {
    link: React.PropTypes.bool,
    onClick: React.PropTypes.func,
    primary: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    secondary: React.PropTypes.bool,
    className: React.PropTypes.string
  },

  render: function () {
    var {children, className, link, disabled, primary, secondary, ...other} = this.props
    className = classnames('base-button', 'enhanced-button', className, {
      disabled, link, primary, secondary
    })

    var props = {
      ...other, disabled, className,
      onClick: this._onClick
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

  _onClick: function (e) {
    if (!this.props.disabled && this.props.onClick)
      this.props.onClick(e)
  }
})

module.exports = EnhancedButton
