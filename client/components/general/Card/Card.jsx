require('./Card.less')

const cn = require('classnames')
const React = require('react/addons')
const PureRenderMixin = React.addons.PureRenderMixin

const Card = React.createClass({
  mixins: [
    PureRenderMixin
  ],

  propTypes: {
    zDepth: React.PropTypes.number
  },

  getDefaultProps () {
    return {
      zDepth: 1
    }
  },

  render () {
    const {children, zDepth, className, ...props} = this.props
    return (
      <div
        className={cn(`card card-depth-${zDepth}`, className)}
        {...props}
      >
        {children}
      </div>
    )
  }

})

module.exports = Card
