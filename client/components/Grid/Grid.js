/**
 * Grid
 * @flow
 */
import type { ReactElement } from 'react'
import React, { PropTypes } from 'react'
import gridClassNames from './Grid.css'
import cn from 'classnames'

const SIZES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

export function Grid ({ noSpacing, className, ...props }: Object): ReactElement {
  const classNames = cn(
    gridClassNames.grid,
    noSpacing ? gridClassNames.noSpacing : '',
    className
  )

  return (
    <div
      className={classNames}
      {...props}
    />
  )
}
Object.assign(Grid, {
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
  propTypes: {
    size: PropTypes.oneOf(SIZES).isRequired,
    className: PropTypes.string
  },
  defaultProps: {
    size: 12
  }
})
