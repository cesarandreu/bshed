require('./Grid.less')

const cn = require('classnames')
const React = require('react/addons')
const PureRenderMixin = React.addons.PureRenderMixin

const Grid = React.createClass({
  mixin: [PureRenderMixin],

  propTypes: {
    className: React.PropTypes.string,
    subheader: React.PropTypes.string
  },

  render () {
    const {children, className, subheader, ...props} = this.props
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
