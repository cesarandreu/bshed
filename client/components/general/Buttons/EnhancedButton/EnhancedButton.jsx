require('./EnhancedButton.less')

const cn = require('classnames')
const React = require('react/addons')
const PureRenderMixin = React.addons.PureRenderMixin

const EnhancedButton = React.createClass({
  mixins: [
    PureRenderMixin
  ],

  render () {
    const {children, className, ...props} = this.props
    return (
      <button
        className={cn('enhanced-button', className)}
        {...props}
      >
        {children}
      </button>
    )
  }
})

module.exports = EnhancedButton
