import { ScreenContainer } from 'modules/Screen'
import { SnackbarContainer } from 'modules/Snackbar'
import React, { PropTypes } from 'react'
import styles from './Application.css'

export default function Application ({ children }) {
  return (
    <div className={styles.container}>
      <ScreenContainer/>
      <SnackbarContainer/>
      {children}
    </div>
  )
}

Application.propTypes = {
  children: PropTypes.node.isRequired
}
