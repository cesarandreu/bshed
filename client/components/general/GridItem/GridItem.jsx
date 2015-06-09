require('./GridItem.less')

const cn = require('classnames')
const React = require('react/addons')
const ImmutableRenderMixin = require('react-immutable-render-mixin')

const GridItem = React.createClass({
  mixin: [
    ImmutableRenderMixin
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
