require('./GridItem.less')

const cn = require('classnames')
const React = require('react/addons')
const PureRenderMixin = React.addons.PureRenderMixin

const GridItem = React.createClass({
  mixin: [
    PureRenderMixin
  ],

  render () {
    const {children, className, ...props} = this.props
    return (
      <div
        className={cn('grid-item', className)}
        {...props}
      >
        {children}
      </div>
    )
  }
})

module.exports = GridItem
