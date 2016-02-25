import cn from 'classnames'
import { Body2, Caption, Hint } from 'components/Text'
import React, { PropTypes } from 'react'
import styles from './Stepper.css'

export function Stepper ({ children }) {
  return (
    <div className={styles.stepper}>
      {children}
    </div>
  )
}

Stepper.propTypes = {
  children: PropTypes.node.isRequired
}

// @TODO: Add complete property?
export function Step ({ active, children, name, number, summary }) {
  const circleClassNames = cn(styles.circle, {
    [styles.activeCircle]: active,
    [styles.inactiveCircle]: !active
  })

  return (
    <div className={styles.step}>
      <div className={styles.title}>
        <div className={circleClassNames}>
          <Caption
            light
            primary
          >
            {/* @TODO: Change number for checkmark when done */}
            {number}
          </Caption>
        </div>
        <div className={styles.label}>
          <Body2
            className={styles.name}
            dark
            disabled={!active}
            primary={active}
          >
            {name}
          </Body2>
          {summary && (
            <Hint className={styles.summary}>
              {summary}
            </Hint>
          )}
        </div>
      </div>

      <div className={styles.body}>
        {children}
      </div>

      <div className={styles.line}/>
    </div>
  )
}

Step.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  summary: PropTypes.string
}
