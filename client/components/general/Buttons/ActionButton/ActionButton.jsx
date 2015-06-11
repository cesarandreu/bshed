require('./ActionButton.less')

const React = require('react')
const cn = require('classnames')
const IconButton = require('../IconButton')
const ImmutableRenderMixin = require('react-immutable-render-mixin')

const ActionButton = React.createClass({
  mixins: [
    ImmutableRenderMixin
  ],

  propTypes: {
    icon: React.PropTypes.string.isRequired
  },

  render () {
    const {className, icon, ...props} = this.props
    return (
      <IconButton
        className={cn('action-button', className)}
        icon={icon}
        {...props}
      />
    )
  }
})

module.exports = ActionButton
