require('./icon-button')

const Icon = require('../Icon')
const React = require('react/addons')
const classnames = require('classnames')
const EnhancedButton = require('./EnhancedButton')
const PureRenderMixin = React.addons.PureRenderMixin

const IconButton = React.createClass({
  mixins: [PureRenderMixin],

  propTypes: {
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    icon: React.PropTypes.string.isRequired
  },

  render () {
    const {icon, className, ...other} = this.props
    return (
      <EnhancedButton {...other} className={classnames('icon-button', className)}>
        <Icon icon={icon}/>
      </EnhancedButton>
    )
  }
})

module.exports = IconButton
