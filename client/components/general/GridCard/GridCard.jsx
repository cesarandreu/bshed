require('./GridCard.less')

const cn = require('classnames')
const Card = require('../Card')
const React = require('react/addons')
const PureRenderMixin = React.addons.PureRenderMixin

const GridCard = React.createClass({
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
