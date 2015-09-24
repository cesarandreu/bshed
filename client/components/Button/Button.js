/**
 * Button
 * @flow
 */
import buttonClassNames from './Button.css'
import type { ReactElement } from 'react'
import React, { PropTypes } from 'react'
import cn from 'classnames'

export function Button ({ children, color, ...props }: Object): ReactElement {
  const classNames = cn([
    [buttonClassNames.button, !color],
    [buttonClassNames.color, color]
  ].reduce((result, [className, hasClassName]) => {
    if (hasClassName) {
      result.push(className)
    }
    return result
  }, []))

  return (
    <button
      className={classNames}
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
