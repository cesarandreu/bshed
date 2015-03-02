var React = require('react'),
  classnames = require('classnames'),
  _ = require('lodash')

var Icon = React.createClass({
  propTypes: {
    icon: React.PropTypes.string.isRequired
  },
  render: function () {
    var {className, icon, ...other} = this.props
    var classes = classnames('icon', icon, className, {md: _.contains(icon, 'md')})
    return <span {...other} className={classes}></span>
  }
})

module.exports = Icon
