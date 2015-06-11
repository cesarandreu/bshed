require('./Grid.less')

const cn = require('classnames')
const React = require('react')
const ImmutableRenderMixin = require('react-immutable-render-mixin')

const Grid = React.createClass({
  mixin: [
    ImmutableRenderMixin
  ],

  propTypes: {
    subheader: React.PropTypes.string,
    className: React.PropTypes.string,
    children: React.PropTypes.node
  },

  render () {
    const {children, className, subheader, ...props} = this.props
    return (
      <div
        className={cn('grid-container', className)}
        {...props}
      >
        {subheader ? <div className='grid-subheader'>{subheader}</div> : null}
        <div className='grid'>
          {children}
        </div>
      </div>
    )
  }
})

module.exports = Grid
