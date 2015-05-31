require('./labeled-action-button.less')

const React = require('react/addons')
const classnames = require('classnames')
const ActionButton = require('./ActionButton')
const PureRenderMixin = React.addons.PureRenderMixin

// TODO: allow setting label position, currently sets position to the left
const LabeledActionButton = React.createClass({
  mixins: [PureRenderMixin],
  propTypes: {
    position: React.PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
    label: React.PropTypes.string.isRequired,
    icon: React.PropTypes.string.isRequired,
    className: React.PropTypes.string,
    mini: React.PropTypes.bool
  },

  getDefaultProps () {
    return {
      position: 'left'
    }
  },

  render () {
    const {children, label, className, mini, position, ...props} = this.props
    return (
      <div className={classnames('labeled-action-button', {mini}, className, position)}>
        <ActionButton mini={mini} {...props}/>
        <label>{label}</label>
        {children}
      </div>
    )
  }
})

module.exports = LabeledActionButton
