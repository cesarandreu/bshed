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

export function Hint ({ children }) {
  return (
    <div className={styles.hint}>
      {children}
    </div>
  )
}

export function PrimaryText ({ children }) {
  return (
    <div className={styles.primary}>
      {children}
    </div>
  )
}

export function SecondaryText ({ children }) {
  return (
    <div className={styles.secondary}>
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
