import './Grid.less'
import cn from 'classnames'
import React, { PropTypes } from 'react'
import ImmutableRenderMixin from 'react-immutable-render-mixin'

const Grid = React.createClass({
  mixin: [
    ImmutableRenderMixin
  ],

  propTypes: {
    subheader: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node
  },

  render () {
    const { children, className, subheader, ...other } = this.props

    return (
      <div
        className={cn('grid-container', className)}
        {...other}
      >
        {subheader
          ? <div className='grid-subheader'>{subheader}</div>
          : null
        }
        <div className='grid'>
          {children}
        </div>
      </div>
    )
  }
})

export default Grid
