require('./ActionButton.less')

const cn = require('classnames')
const React = require('react/addons')
const IconButton = require('../IconButton')
const PureRenderMixin = React.addons.PureRenderMixin

const ActionButton = React.createClass({
  mixins: [
    PureRenderMixin
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
