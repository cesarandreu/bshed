/**
 * Button
 * @flow
 */
import cn from './Button.css'
import type { ReactElement } from 'react'
import React, { PropTypes } from 'react'

export function Button ({ children, color, ...props }: Object): ReactElement {
  return (
    <button
      type='button'
      className={color ? cn.color : cn.button}
      {...props}
    >
      {children}
    </button>
  )
}
Object.assign(Button, {
  propTypes: {
    children: PropTypes.node.isRequired,
    color: PropTypes.bool.isRequired
  },
  defaultProps: {
    color: false
  }
})
