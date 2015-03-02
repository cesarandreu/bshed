var React = require('react'),
  Icon = require('./Icon.jsx'),
  EnhancedButton = require('./EnhancedButton.jsx'),
  classnames = require('classnames')

var IconButton = React.createClass({
  propTypes: {
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    icon: React.PropTypes.string.isRequired
  },
  render: function () {
    var {icon, className, ...other} = this.props
    return (
      <EnhancedButton {...other} className={classnames('icon-button', className)}>
        <Icon icon={icon}/>
      </EnhancedButton>
    )
  }
})

module.exports = IconButton
