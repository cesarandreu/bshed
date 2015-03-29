var React = require('react/addons'),
  classnames = require('classnames'),
  IconButton = require('./IconButton.jsx'),
  PureRenderMixin = React.addons.PureRenderMixin

var ActionButton = React.createClass({
  mixins: [PureRenderMixin],
  propTypes: {
    icon: React.PropTypes.string.isRequired,
    className: React.PropTypes.string,
    mini: React.PropTypes.bool
  },
  render: function () {
    var {className, icon, mini, ...props} = this.props
    className = classnames('action-button', {mini}, className)
    return <IconButton className={className} icon={icon} {...props}/>
  }
})

module.exports = ActionButton
