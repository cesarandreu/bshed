// @TODO: Add more elevations if needed
import { Headline } from 'components/Text'
import React, { PropTypes } from 'react'
import styles from './Card.css'
import cn from 'classnames'

export function Card ({ children, elevation, heading }) {
  return (
    <div
      aria-label={heading}
      className={cn(styles.card, styles[`elevation${elevation}`])}
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

Card.propTypes = {
  children: PropTypes.node.isRequired,
  elevation: PropTypes.oneOf([1]).isRequired,
  heading: PropTypes.string
}

Card.defaultProps = {
  elevation: 1
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