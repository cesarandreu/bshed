require('./GridCard.less')

const React = require('react')
const Card = require('../Card')
const cn = require('classnames')
const ImmutableRenderMixin = require('react-immutable-render-mixin')

const GridCard = React.createClass({
  mixin: [
    ImmutableRenderMixin
  ],

  propTypes: {
    className: React.PropTypes.string,
    children: React.PropTypes.node,
    height: React.PropTypes.number,
    width: React.PropTypes.number
  },

  getDefaultProps () {
    return {
      height: 212,
      width: 280
    }
  },

  render () {
    const {children, className, height, width, ...props} = this.props
    return (
      <Card
        style={{height, width}}
        className={cn('grid-card', className)}
        {...props}
      >
        {children}
      </Card>
    )
  }
})

module.exports = GridCard
