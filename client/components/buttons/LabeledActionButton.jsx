var React = require('react'),
  classnames = require('classnames'),
  ActionButton = require('./ActionButton.jsx')

// TODO: allow setting label position, currently sets position to the left
var LabeledActionButton = React.createClass({
  propTypes: {
    position: React.PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
    label: React.PropTypes.string.isRequired,
    icon: React.PropTypes.string.isRequired,
    className: React.PropTypes.string,
    mini: React.PropTypes.bool
  },
  getDefaultProps: function () {
    return {
      position: 'left'
    }
  },
  render: function () {
    var {children, label, className, mini, position, ...props} = this.props
    className = classnames('labeled-action-button', {mini}, className, position)
    return (
      <div className={className}>
        <ActionButton mini={mini} {...props}/>
        <label>{label}</label>
        {children}
      </div>
    )
  }
})

module.exports = LabeledActionButton
