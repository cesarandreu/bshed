/**
 * Card
 * @flow
 */
import type { ReactElement } from 'react'
import React, { PropTypes } from 'react'
import cn from './Card.css'

export function Card ({ children, shadow }: Object): ReactElement {
  const shadowName = `shadow${shadow}`
  return (
    <div className={`${cn.card} ${cn[shadowName]}`}>
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
    <div className={cn.body}>
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
  return (
    <div className={`${cn.actions} ${border ? cn.actionsBorder : ''}`}>
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
