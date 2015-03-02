var React = require('react'),
  classnames = require('classnames')

var EnhancedButton = React.createClass({
  propTypes: {
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    link: React.PropTypes.bool,
    onTouchTap: React.PropTypes.func
  },

  render: function () {
    var {children, className, link, disabled, ...other} = this.props
    className = classnames('base-button', 'enhanced-button', className, {disabled, link})

    var props = {
      ...other, disabled, className,
      onTouchTap: this._onTouchTap
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

  _onTouchTap: function (e) {
    if (this.props.onTouchTap) this.props.onTouchTap(e)
  }
})

module.exports = EnhancedButton
