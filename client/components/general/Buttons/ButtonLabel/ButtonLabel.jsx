require('./ButtonLabel.less')

const cn = require('classnames')
const React = require('react/addons')
const ImmutableRenderMixin = require('react-immutable-render-mixin')

const ButtonLabel = React.createClass({
  mixins: [
    ImmutableRenderMixin
  ],

  render () {
    const {className, children, ...props} = this.props
    return (
      <span
        className={cn('button-label', className)}
        {...props}
      >
        {children}
      </span>
    )
  }
})

module.exports = ButtonLabel
