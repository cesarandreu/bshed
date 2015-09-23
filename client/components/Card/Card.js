/**
 * Card
 * @flow
 */
import React, { PropTypes } from 'react'
import cardClassNames from './Card.css'
import type ReactElement from 'react'
import cn from 'classnames'

export function Card ({ children, shadow }: Object): ReactElement {
  return (
    <div className={cn(cardClassNames.card, cardClassNames[`shadow${shadow}`])}>
      {children}
    </div>
  )
}
Object.assign(Card, {
  propTypes: {
    children: PropTypes.node.isRequired,
    shadow: PropTypes.oneOf([2, 3, 4, 6, 8, 16]).isRequired
  },
  defaultProps: {
    shadow: 2
  }
})

export function CardBody ({ children }: Object): ReactElement {
  return (
    <div className={cardClassNames.body}>
      {children}
    </div>
  )
}
Object.assign(CardBody, {
  propTypes: {
    children: PropTypes.node.isRequired
  }
})

export function CardActions ({ children, border }: Object): ReactElement {
  const cardActionsClassName = cn(cardClassNames.actions, {
    [cardClassNames.borderTop]: border
  })

  return (
    <div className={cardActionsClassName}>
      {children}
    </div>
  )
}
Object.assign(CardActions, {
  propTypes: {
    border: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired
  },
  defaultProps: {
    border: false
  }
})
