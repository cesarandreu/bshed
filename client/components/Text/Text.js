import cn from 'classnames'
import React from 'react'
import styles from './Text.css'

export function Caption ({ children }) {
  return (
    <div className={styles.caption}>
      {children}
    </div>
  )
}

export function Headline ({ children }) {
  return (
    <h3 className={styles.headline}>
      {children}
    </h3>
  )
}

export function Hint ({ children, className }) {
  return (
    <div className={cn(styles.hint, className)}>
      {children}
    </div>
  )
}

export function PrimaryText ({ children, className }) {
  return (
    <div className={cn(styles.primary, className)}>
      {children}
    </div>
  )
}

export function SecondaryText ({ children, className }) {
  return (
    <div className={cn(styles.secondary, className)}>
      {children}
    </div>
  )
}

export function Title ({ children }) {
  return (
    <div className={styles.title}>
      {children}
    </div>
  )
}
