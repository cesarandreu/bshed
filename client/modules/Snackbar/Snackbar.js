import cn from 'classnames'
import { Body2 } from 'components/Text'
import React, { PropTypes } from 'react'
import { spring, TransitionMotion } from 'react-motion'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import styles from './Snackbar.css'
import { SnackbarSelectors } from './SnackbarModule'

export function Snackbar ({ hidden, id, message }) {
  return (
    <div
      aria-hidden={hidden}
      aria-live='assertive'
      className={cn(styles.snackbar, {
        [styles.hidden]: hidden
      })}
      id={id}
      role='alert'
    >
      <Body2 light secondary>
        {message}
      </Body2>
    </div>
  )
}

Snackbar.propTypes = {
  hidden: PropTypes.bool,
  id: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired
}

export function SnackbarAnimator ({ snackbarList }) {
  return (
    <TransitionMotion
      defaultStyles={snackbarList.map(({ id, message }, idx) => ({
        data: {
          hidden: idx !== 0,
          id,
          message
        },
        key: id,
        style: {
          Y: idx === 0 ? 0 : 100
        }
      }))}
      styles={snackbarList.map(({ id, message }, idx) => ({
        key: id,
        data: {
          hidden: idx !== 0,
          id,
          message
        },
        style: {
          Y: idx === 0 ? spring(0) : 100
        }
      }))}
      willEnter={() => ({
        Y: 100
      })}
      willLeave={() => ({
        Y: spring(100)
      })}
    >
      {(interpolatedStyles) => (
        <div className={styles.container}>
          {interpolatedStyles.map(({ data: { hidden, id, message }, key, style }, idx) =>
            <div
              className={styles.wrapper}
              key={key}
              style={{
                transform: `translateY(${style.Y}%)`,
                WebkitTransform: `translateY(${style.Y}%)`
              }}
            >
              <Snackbar
                hidden={hidden}
                id={id}
                message={message}
              />
            </div>
          )}
        </div>
      )}
    </TransitionMotion>
  )
}

SnackbarAnimator.propTypes = {
  snackbarList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired
  }).isRequired).isRequired
}

const SnackbarAnimatorSelectors = createStructuredSelector({
  snackbarList: SnackbarSelectors.snackbarList
})

export const SnackbarContainer = connect(
  SnackbarAnimatorSelectors
)(SnackbarAnimator)
