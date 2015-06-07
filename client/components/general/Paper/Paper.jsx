require('./Paper.less')
const React = require('react')
const cn = require('classnames')

const Paper = React.createClass({
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
        className={cn(`paper paper-z${zDepth}`, className)}
        {...props}
      >
        {children}
      </div>
    )
  }
})

module.exports = Paper
