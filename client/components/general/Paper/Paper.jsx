require('./Paper.less')

const React = require('react')
const cn = require('classnames')
const ImmutableRenderMixin = require('react-immutable-render-mixin')

const Paper = React.createClass({
  mixins: [
    ImmutableRenderMixin
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
    const {zDepth, children, className, ...props} = this.props
    return (
      <div
        className={cn(`paper paper-depth-${zDepth}`, className)}
        {...props}
      >
        {children}
      </div>
    )
  }
})

module.exports = Paper
