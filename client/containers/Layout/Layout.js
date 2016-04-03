import React, { PropTypes } from 'react'
import styles from './Layout.css'

export default function Layout ({ children }) {
  return (
    <div className={styles.container}>
      {children}
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}
