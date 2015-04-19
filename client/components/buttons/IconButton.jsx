var React = require('react/addons'),
  classnames = require('classnames'),
  Icon = require('../general/Icon'),
  EnhancedButton = require('./EnhancedButton'),
  PureRenderMixin = React.addons.PureRenderMixin

var IconButton = React.createClass({
  mixins: [PureRenderMixin],

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
