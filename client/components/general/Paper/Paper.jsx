require('./Paper.less')

const cn = require('classnames')
const React = require('react/addons')
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
