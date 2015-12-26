import cn from 'classnames'
import styles from './Button.css'
import React, { Component, PropTypes } from 'react'
import { Icon } from 'components/Icon'

export class Button extends Component {
  getClassNames () {
    const { flat, primary, raised, secondary } = this.props
    const plain = !primary && !secondary
    return cn(styles.base, {
      [styles.plainFlat]: flat && plain,
      [styles.plainRaised]: raised && plain,
      [styles.primaryFlat]: flat && primary,
      [styles.primaryRaised]: raised && primary,
      [styles.secondaryFlat]: flat && secondary,
      [styles.secondaryRaised]: raised && secondary
    })
  }

  render () {
    const { children, disabled, icon, onClick } = this.props
    return (
      <button
        className={this.getClassNames()}
        disabled={disabled}
        onClick={onClick}
        type='button'
      >
        {icon && (
          <Icon type={icon}/>
        )}
        {children}
      </button>
    )
  }
}

Button.defaultProps = {
  disabled: false,
  flat: false,
  icon: '',
  primary: false,
  raised: false,
  secondary: false
}

Button.propTypes = {
  children: PropTypes.node,
  disabled: PropTypes.bool,
  flat: PropTypes.bool,
  icon: PropTypes.string,
  onClick: PropTypes.func,
  primary: PropTypes.bool,
  raised: PropTypes.bool,
  secondary: PropTypes.bool
}
