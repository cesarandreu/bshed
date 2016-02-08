import cn from 'classnames'
import React, { PropTypes } from 'react'
import styles from './RaisedButton.css'

export function RaisedButton (props) {
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

  const raisedButtonClassNames = cn(styles.base, className, {
    [styles.accent]: accent || (!accent && !primary),
    [styles.dark]: dark,
    [styles.light]: light || (!light && !primary),
    [styles.primary]: primary
  })

  return (
    <button
      disabled={disabled}
      className={raisedButtonClassNames}
      onClick={onClick}
      type='button'
      {...otherProps}
    >
      {children}
    </button>
  )
}

RaisedButton.propTypes = {
  accent: PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  dark: PropTypes.bool,
  disabled: PropTypes.bool,
  light: PropTypes.bool,
  onClick: PropTypes.func,
  primary: PropTypes.bool
}
