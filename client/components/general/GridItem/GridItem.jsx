require('./GridItem.less')

const cn = require('classnames')
const React = require('react/addons')
const PureRenderMixin = React.addons.PureRenderMixin

const GridItem = React.createClass({
  mixin: [
    PureRenderMixin
  ],

  propTypes: {
    height: React.PropTypes.number,
    width: React.PropTypes.number
  },

  getDefaultProps () {
    return {
      height: 212,
      width: 212
    }
  },

  render () {
    const {children, className, height, width, ...props} = this.props
    return (
      <div
        style={{height, width}}
        className={cn('grid-item', className)}
        {...props}
      >
        {children}
      </div>
    )
  }
})

module.exports = GridItem
