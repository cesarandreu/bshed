var React = require('react/addons'),
  classnames = require('classnames'),
  PureRenderMixin = React.addons.PureRenderMixin

var Icon = React.createClass({
  mixins: [PureRenderMixin],
  propTypes: {
    icon: React.PropTypes.string.isRequired
  },
  render: function () {
    var {className, icon, ...other} = this.props
    var classes = classnames('icon', icon, className, {md: !icon.indexOf('md')})
    return <span {...other} className={classes}></span>
  }
})

module.exports = Icon
