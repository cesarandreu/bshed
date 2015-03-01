var React = require('react'),
  classnames = require('classnames'),
  Icon = require('../general/Icon.jsx')

var ActionButton = React.createClass({
  propTypes: {
    icon: React.PropTypes.string.isRequired,
    className: React.PropTypes.string,
    mini: React.PropTypes.bool
  },
  render: function () {
    var {className, icon, mini, ...props} = this.props
    className = classnames('base-button', 'action-button', {mini}, className)
    return (
      <button className={className} {...props}>
        <Icon className='action-button-icon' icon={icon}/>
      </button>
    )
  }
})

module.exports = ActionButton
