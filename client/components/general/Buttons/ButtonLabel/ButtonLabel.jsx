require('./ButtonLabel.less')

const cn = require('classnames')
const React = require('react/addons')
const PureRenderMixin = React.addons.PureRenderMixin

const ButtonLabel = React.createClass({
  mixins: [
    PureRenderMixin
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
