require('./action-button.less')

const cn = require('classnames')
const React = require('react/addons')
const IconButton = require('./IconButton')
const PureRenderMixin = React.addons.PureRenderMixin

const ActionButton = React.createClass({
  mixins: [PureRenderMixin],

  propTypes: {
    icon: React.PropTypes.string.isRequired,
    className: React.PropTypes.string,
    mini: React.PropTypes.bool
  },

  render () {
    const {className, icon, mini, ...props} = this.props
    return (
      <IconButton
        className={cn('action-button', {mini}, className)}
        icon={icon}
        {...props}
      />
    )
  }
})

module.exports = ActionButton
