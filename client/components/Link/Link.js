import { Link as ReactRouterLink } from 'react-router'
import styles from './Link.css'
import React from 'react'

export function Link (props) {
  return (
    <ReactRouterLink className={styles.link} {...props}/>
  )
}
