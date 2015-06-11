require('./Icon.less')

const cn = require('classnames')
const React = require('react')
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
    return (
      <span
        className={cn('icon', icon, className, {md: !icon.indexOf('md')})}
        {...other}
      />
    )
  }
})

module.exports = Icon
