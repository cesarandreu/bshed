import cn from 'classnames'
import React, { Component, PropTypes } from 'react'
import styles from './TextInput.css'

// @TODO: Add tabindex?
// @TODO: Add more types if needed
export class TextInput extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      focus: false
    }
    this._onBlur = this._onBlur.bind(this)
    this._onFocus = this._onFocus.bind(this)
    this._setInput = this._setInput.bind(this)
  }

  componentDidUpdate () {
    const { focus } = this.state
    const { disabled } = this.props
    if (focus && disabled) {
      this.input.blur()
    }
  }

  _onBlur () {
    this.setState({
      focus: false
    })
  }

  _onFocus () {
    this.setState({
      focus: true
    })
  }

  _setInput (input) {
    this.input = input
  }

  render () {
    const {
      autoFocus,
      disabled,
      error,
      label,
      name,
      onChange,
      type,
      value
    } = this.props
    const { focus } = this.state

    const inputProps = {
      autoComplete: 'off',
      autoFocus,
      disabled,
      name,
      onBlur: this._onBlur,
      onChange,
      onFocus: this._onFocus,
      ref: this._setInput,
      type,
      value
    }

    const inputClassNames = cn(styles.input, {
      [styles.inputError]: error
    })

    const labelClassNames = cn(styles.label, styles.underline, {
      // Colored label when there's no error and it's focused and it has a value
      [styles.labelColored]: !error && focus && (value || value === 0),

      // Red label when it has an error and a value
      [styles.labelError]: error && (value || value === 0),

      // Float when it has a value
      [styles.labelFloat]: value || value === 0,

      // Regular color when there's no error and no value
      [styles.labelRegular]: !error && ((!value && value !== 0) || !focus),

      // Red underline color when there's an error
      [styles.underlineError]: error,

      // Regular underline color if there's no error
      [styles.underlineRegular]: !error,

      // Show the underline if it has an error or focus and it's not disabled
      [styles.underlineVisible]: !disabled && error || focus
    })

    const errorClassNames = cn(styles.error, {
      [styles.hideError]: !error,
      [styles.showError]: error
    })

    return (
      <div
        className={styles.container}
        disabled={disabled}
      >
        <input
          className={inputClassNames}
          {...inputProps}
        />

        <label
          className={labelClassNames}
          htmlFor={name}
        >
          {label || name}
        </label>

        <div className={errorClassNames}>
          {error}
        </div>
      </div>
    )
  }
}

TextInput.propTypes = {
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['text']).isRequired,
  value: PropTypes.string.isRequired
}

TextInput.defaultProps = {
  type: 'text'
}
