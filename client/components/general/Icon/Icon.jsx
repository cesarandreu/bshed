require('./Icon.less')

const React = require('react/addons')
const classnames = require('classnames')
const ImmutableRenderMixin = require('react-immutable-render-mixin')

const Icon = React.createClass({
  mixins: [
    ImmutableRenderMixin
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
