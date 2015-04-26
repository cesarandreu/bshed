var cn = require('classnames')
var React = require('react/addons')
var IconButton = require('./IconButton')
var PureRenderMixin = React.addons.PureRenderMixin

var ActionButton = React.createClass({
  mixins: [PureRenderMixin],

  propTypes: {
    icon: React.PropTypes.string.isRequired,
    className: React.PropTypes.string,
    mini: React.PropTypes.bool
  },

  render: function () {
    var {className, icon, mini, ...props} = this.props
    return (
      <IconButton
        className={cn('action-button', {mini}, className)}
        icon={icon}
        {...props}/>
    )
  }
})

module.exports = ActionButton
