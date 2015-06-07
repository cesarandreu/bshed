require('./LabeledActionButton.less')

const cn = require('classnames')
const React = require('react/addons')
const ActionButton = require('../ActionButton')
const PureRenderMixin = React.addons.PureRenderMixin

// TODO: allow setting label position, currently sets position to the left
const LabeledActionButton = React.createClass({
  mixins: [
    PureRenderMixin
  ],

  propTypes: {
    position: React.PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
    label: React.PropTypes.string.isRequired,
    icon: React.PropTypes.string.isRequired
  },

  getDefaultProps () {
    return {
      position: 'left'
    }
  },

  render () {
    const {label, className, position, ...props} = this.props
    return (
      <div className={cn('labeled-action-button', className, position)}>
        <ActionButton {...props}/>
        <label>{label}</label>
      </div>
    )
  }
})

module.exports = LabeledActionButton
