require('./EnhancedButton.less')

const cn = require('classnames')
const React = require('react/addons')
const ImmutableRenderMixin = require('react-immutable-render-mixin')

const EnhancedButton = React.createClass({
  mixins: [
    ImmutableRenderMixin
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
