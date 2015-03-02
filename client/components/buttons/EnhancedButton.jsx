var React = require('react/addons'),
  cx = React.addons.classSet

var EnhancedButton = React.createClass({
  propTypes: {
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    link: React.PropTypes.bool,
    onTouchTap: React.PropTypes.func
  },

  render: function () {
    var {className, link, disabled, ...other} = this.props,
    classes = cx({
      'enhanced-button': true,
      [className]: className,
      disabled, link
    })

    var props = {
      disabled,
      className: classes,
      onTouchTap: this._onTouchTap
    }

    var enhancedButton
    if (disabled && link) {
      enhancedButton = (
        <span {...other} className={classes} disabled={disabled}>
          {this.props.children}
        </span>
      )
    } else if (link) {
      enhancedButton = <a {...other} {...props}>{this.props.children}</a>
    } else {
      enhancedButton = <button {...other} {...props}>{this.props.children}</button>
    }

    return enhancedButton
  },

  _onTouchTap: function (e) {
    if (this.props.onTouchTap) this.props.onTouchTap(e)
  }
})

module.exports = EnhancedButton
