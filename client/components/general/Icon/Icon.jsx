require('./icon.less')

const React = require('react/addons')
const classnames = require('classnames')
const PureRenderMixin = React.addons.PureRenderMixin

const Icon = React.createClass({
  mixins: [
    PureRenderMixin
  ],

  propTypes: {
    icon: React.PropTypes.string.isRequired
  },

  render () {
    const {className, icon, ...other} = this.props
    const classes = classnames('icon', icon, className, {md: !icon.indexOf('md')})
    return <span {...other} className={classes}></span>
  }
})

module.exports = Icon
