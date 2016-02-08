import cn from 'classnames'
import React, { PropTypes } from 'react'
import styles from './FlatButton.css'

export function FlatButton (props) {
  const {
    accent,
    children,
    className,
    dark,
    disabled,
    light,
    onClick,
    primary,
    ...otherProps
  } = props

  const flatButtonClassNames = cn(styles.base, className, {
    [styles.accent]: accent,
    [styles.dark]: dark,
    [styles.light]: light || (!dark && !light),
    [styles.primary]: primary
  })

  return (
    <button
      disabled={disabled}
      className={flatButtonClassNames}
      onClick={onClick}
      type='button'
      {...otherProps}
    >
      {children}
    </button>
  )
}

FlatButton.propTypes = {
  accent: PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  dark: PropTypes.bool,
  disabled: PropTypes.bool,
  light: PropTypes.bool,
  onClick: PropTypes.func,
  primary: PropTypes.bool
}
