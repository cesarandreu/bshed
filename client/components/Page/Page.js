import React, { PropTypes } from 'react'
import styles from './Page.css'

export function Page ({ children }) {
  return (
    <div className={styles.page}>
      {children}
    </div>
  )
}

Page.propTypes = {
  children: PropTypes.node.isRequired
}
