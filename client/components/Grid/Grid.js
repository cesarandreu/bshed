/**
 * Grid
 * @flow
 */
import type { ReactElement } from 'react'
import React, { PropTypes } from 'react'
import cn from './Grid.css'

const SIZES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

export function Grid ({ noSpacing, className, ...props }: Object): ReactElement {
  return (
    <div
      className={`${cn.grid} ${noSpacing ? cn.noSpacing : ''} ${className}`}
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
    noSpacing: false,
    className: ''
  }
})

export function Cell ({ size, className, ...props }: Object): ReactElement {
  const colName = `col${size}`
  return (
    <div
      className={`${cn.cell} ${cn[colName]} ${className}`}
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
    className: '',
    size: 12
  }
})
