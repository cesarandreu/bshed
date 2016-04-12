import cn from 'classnames'
import React, { Component, PropTypes } from 'react'
import styles from './Spinner.css'

export class Spinner extends Component {
  // constructor () {
  // }

  render () {
    const { active } = this.props
    if (active) {
      return (
        <div className={styles.container}>
          <div className={cn(styles.layer, { [styles.activeLayer]: active })}>
            <div className={cn(styles.leftCircleClipper)}>
              <div className={styles.circle}/>
            </div>

            <div className={styles.gapPatch}>
              <div className={styles.circle}/>
            </div>

            <div className={cn(styles.rightCircleClipper)}>
              <div className={styles.circle}/>
            </div>
          </div>
        </div>
      )
    } else {
      return null
    }
  }
}

Spinner.propTypes = {
  active: PropTypes.bool
}
