import cn from 'classnames'
import { Caption, PrimaryText } from 'components/Text'
import React, { PropTypes } from 'react'
import Collapse from 'react-collapse'
import styles from './Stepper.css'

export function Stepper ({ children }) {
  return (
    <div className={styles.stepper}>
      {children}
    </div>
  )
}

// @TODO: Add complete property?
export function Step ({ active, children, name, number }) {
  const circleClassNames = cn(styles.circle, {
    [styles.activeCircle]: active,
    [styles.inactiveCircle]: !active
  })

  const nameClassNames = cn(styles.name, {
    [styles.activeName]: active,
    [styles.inactiveName]: !active
  })

  return (
    <div className={styles.step}>
      <div className={styles.title}>
        <div className={circleClassNames}>
          <Caption>
            {number}
          </Caption>
        </div>
        <PrimaryText className={nameClassNames}>
          {name}
        </PrimaryText>
      </div>

      <Collapse
        className={styles.body}
        isOpened={active}
      >
        {children}
      </Collapse>

      <div className={styles.line}/>
    </div>
  )
}

Step.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired
}
