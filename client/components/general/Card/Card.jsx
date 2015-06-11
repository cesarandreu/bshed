require('./Card.less')

const cn = require('classnames')
const React = require('react')
const ImmutableRenderMixin = require('react-immutable-render-mixin')

const Card = React.createClass({
  mixins: [
    ImmutableRenderMixin
  ],

  propTypes: {
    className: React.PropTypes.string,
    children: React.PropTypes.node,
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
