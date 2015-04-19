var cn = require('classnames'),
  React = require('react/addons'),
  PureRenderMixin = React.addons.PureRenderMixin

var Grid = React.createClass({
  mixin: [PureRenderMixin],

  propTypes: {
    className: React.PropTypes.string
  },

  render: function () {
    var {children, className, ...props} = this.props
    return (
      <div className={cn('grid', className)} {...props}>
        {children}
      </div>
    )
  }
})

module.exports = Grid
