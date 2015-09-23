/**
 * Grid
 * @flow
 */
import shouldPureComponentUpdate from 'react-pure-render/function'
import React, { PropTypes } from 'react'
import gridClassNames from './Grid.css'
import type ReactElement from 'react'
import cn from 'classnames'

const SIZES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

export function Grid ({ noSpacing, className, ...props }: Object): ReactElement {
  return (
    <div
      className={cn(gridClassNames.grid, { [gridClassNames.noSpacing]: noSpacing }, className)}
      {...props}
    />
  )
}
Object.assign(Grid, {
  shouldComponentUpdate: shouldPureComponentUpdate,
  propTypes: {
    noSpacing: PropTypes.bool.isRequired,
    className: PropTypes.string
  },
  defaultProps: {
    noSpacing: false
  }
})

export function Cell ({ size, className, ...props }: Object): ReactElement {
  return (
    <div
      className={cn(gridClassNames.cell, gridClassNames[`col${size}`], className)}
      {...props}
    />
  )
}
Object.assign(Cell, {
  shouldComponentUpdate: shouldPureComponentUpdate,
  propTypes: {
    size: PropTypes.oneOf(SIZES).isRequired,
    className: PropTypes.string
  },
  defaultProps: {
    size: 12
  }
})
