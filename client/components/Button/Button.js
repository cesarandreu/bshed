/**
 * Button
 * @flow
 */
import cn from './Button.css'
import type { ReactElement } from 'react'
import React, { PropTypes } from 'react'

export function Button (props: Object): ReactElement {
  return (
    <button
      className={cn.button}
      type='button'
      {...props}
    />
  )
}
Button.propTypes = {
  children: PropTypes.node.isRequired
}

export function ColorButton (props: Object): ReactElement {
  return (
    <button
      className={cn.color}
      type='button'
      {...props}
    />
  )
}
ColorButton.propTypes = {
  children: PropTypes.node.isRequired
}
