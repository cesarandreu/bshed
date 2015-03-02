var React = require('react'),
  classnames = require('classnames'),
  IconButton = require('./IconButton.jsx')

var ActionButton = React.createClass({
  propTypes: {
    icon: React.PropTypes.string.isRequired,
    className: React.PropTypes.string,
    mini: React.PropTypes.bool
  },
  render: function () {
    var {className, icon, mini, ...props} = this.props
    className = classnames('action-button', {mini}, className)
    return (
      <IconButton className={className} icon={icon} {...props}/>
    )
  }
})

module.exports = ActionButton
