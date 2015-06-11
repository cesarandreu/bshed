require('./EnhancedButton.less')

const React = require('react')
const cn = require('classnames')
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
