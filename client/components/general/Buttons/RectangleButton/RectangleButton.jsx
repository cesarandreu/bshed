require('./RectangleButton.less')

const cn = require('classnames')
const React = require('react/addons')
const EnhancedButton = require('../EnhancedButton')
const PureRenderMixin = React.addons.PureRenderMixin

const RectangleButton = React.createClass({
  mixins: [
    PureRenderMixin
  ],

  render () {
    const {children, className, ...props} = this.props
    return (
      <EnhancedButton
        className={cn('rectangle-button', className)}
        {...props}
      >
        {children}
      </EnhancedButton>
    )
  }
})

module.exports = RectangleButton
