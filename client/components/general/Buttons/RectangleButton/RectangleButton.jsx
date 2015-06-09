require('./RectangleButton.less')

const cn = require('classnames')
const React = require('react/addons')
const EnhancedButton = require('../EnhancedButton')
const ImmutableRenderMixin = require('react-immutable-render-mixin')

const RectangleButton = React.createClass({
  mixins: [
    ImmutableRenderMixin
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
