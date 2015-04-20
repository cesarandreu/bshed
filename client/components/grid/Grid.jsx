var cn = require('classnames'),
  React = require('react/addons'),
  PureRenderMixin = React.addons.PureRenderMixin

var Grid = React.createClass({
  mixin: [PureRenderMixin],

  propTypes: {
    className: React.PropTypes.string,
    subheader: React.PropTypes.string
  },

  render: function () {
    var {children, className, subheader, ...props} = this.props
    return (
      <div className={cn('grid-container', className)} {...props}>
        {subheader ? <div className='grid-subheader'>{subheader}</div> : null}
        <div className='grid'>
          {children}
        </div>
      </div>
    )
  }
})

module.exports = Grid
