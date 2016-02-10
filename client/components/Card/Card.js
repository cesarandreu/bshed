// @TODO: Add more elevations if needed
import cn from 'classnames'
import { Title } from 'components/Text'
import React, { PropTypes } from 'react'
import styles from './Card.css'

export function Card ({ children, className, elevation, title }) {
  return (
    <div
      aria-label={title}
      className={cn(styles.card, styles[`elevation${elevation}`], className)}
    >
      {title != null && (
        <CardTitle>
          {title}
        </CardTitle>
      )}
      {children}
    </div>
  )
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  elevation: PropTypes.oneOf([2]).isRequired,
  title: PropTypes.string
}

Card.defaultProps = {
  elevation: 2
}

export function CardTitle ({ children }) {
  return (
    <div className={styles.title}>
      <Title dark primary>
        {children}
      </Title>
    </div>
  )
}

CardTitle.propTypes = {
  children: PropTypes.node.isRequired
}

export function CardContent ({ children, className }) {
  return (
    <div className={cn(styles.content, className)}>
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
