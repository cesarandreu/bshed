import cn from 'classnames'
import styles from './Button.css'
import React, { Component, PropTypes } from 'react'

export class Button extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      focused: false,
      pressed: false
    }
    this._onBlur = this._onBlur.bind(this)
    this._onFocus = this._onFocus.bind(this)
    this._onKeyDown = this._onKeyDown.bind(this)
    this._onKeyUp = this._onKeyUp.bind(this)
    this._onMouseDown = this._onMouseDown.bind(this)
    this._onMouseUp = this._onMouseUp.bind(this)
    this._setButton = this._setButton.bind(this)
  }

  _onBlur () {
    this.setState({
      focused: false
    })
  }

  _onFocus () {
    this.setState({
      focused: true
    })
  }

  _onKeyDown (e) {
    if ([' ', 'Enter'].includes(e.key)) {
      this.setState({
        pressed: true
      })
    }
  }

  _onKeyUp (e) {
    if ([' ', 'Enter'].includes(e.key)) {
      this.setState({
        pressed: false
      })
      this._button.click()
    }
  }

  _onMouseDown () {
    this.setState({
      pressed: true
    })
  }

  _onMouseUp () {
    this.setState({
      pressed: false
    })
  }

  _setButton (button) {
    this._button = button
  }

  getClassNames () {
    const { pressed } = this.state
    const { raised } = this.props
    return cn(styles.button, styles[`elevation${this.getElevation()}`], {
      [styles.pressed]: pressed,
      [styles.raised]: raised
    })
  }

  getElevation () {
    const { focused, pressed } = this.state
    const { disabled, raised } = this.props
    if (disabled || !raised) {
      return 0
    } else if (pressed) {
      return 4
    } else if (focused) {
      return 3
    } else {
      return 1
    }
  }

  getTabIndex () {
    const { disabled } = this.props
    return disabled ? -1 : 0
  }

  render () {
    const { pressed } = this.state
    const { children, disabled, onClick, raised } = this.props
    return (
      <div
        aria-disabled={disabled}
        aria-pressed={pressed}
        className={this.getClassNames()}
        disabled={disabled}
        onBlur={this._onBlur}
        onClick={onClick}
        onFocus={this._onFocus}
        onKeyDown={this._onKeyDown}
        onKeyUp={this._onKeyUp}
        onMouseDown={this._onMouseDown}
        onMouseUp={this._onMouseUp}
        raised={raised}
        ref={this._setButton}
        role='button'
        tabIndex={this.getTabIndex()}
      >
        {children}
      </div>
    )
  }
}

Button.defaultProps = {
  disabled: false,
  raised: false
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  raised: PropTypes.bool
}
