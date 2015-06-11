require('./ButtonLabel.less')

const React = require('react')
const cn = require('classnames')
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
