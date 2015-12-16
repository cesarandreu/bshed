import { Headline } from 'components/Text'
import React, { PropTypes } from 'react'
import styles from './Card.css'

export function Card ({ children, elevation, heading }) {
  return (
    <div
      aria-label={heading}
      className={`${styles.card} ${styles[`elevation${elevation}`]}`}
    >
      {heading != null && (
        <CardHeader>
          {heading}
        </CardHeader>
      )}
      {children}
    </div>
  )
}

// @TODO: Add more elevations if needed
Card.propTypes = {
  children: PropTypes.node.isRequired,
  elevation: PropTypes.oneOf([2]).isRequired,
  heading: PropTypes.string
}

Card.defaultProps = {
  elevation: 2
}

export function CardHeader ({ children }) {
  return (
    <div className={styles.header}>
      <Headline>
        {children}
      </Headline>
    </div>
  )
}

CardHeader.propTypes = {
  children: PropTypes.node.isRequired
}

export function CardContent ({ children }) {
  return (
    <div className={styles.content}>
      {children}
    </div>
  )
}

CardContent.propTypes = {
  children: PropTypes.node.isRequired
}

export function CardActions ({ children }) {
  return (
    <div className={styles.actions}>
      {children}
    </div>
  )
}

CardActions.propTypes = {
  children: PropTypes.node.isRequired
}
