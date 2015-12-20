import React, { Component, PropTypes } from 'react'
import styles from './TextInput.css'

// @TODO: Add tabindex?
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

  getLabelClassNames ({ hasError, hasFocus, hasValue }) {
    const labelClassNames = [styles.label]
    if (hasValue) {
      labelClassNames.push(styles.labelFloating)
    }
    if (hasError) {
      labelClassNames.push(styles.labelError)
    } else if (hasValue && hasFocus) {
      labelClassNames.push(styles.labelFocused)
    } else {
      labelClassNames.push(styles.labelColored)
    }
    return labelClassNames.join(' ')
  }

  getUnfocusedLineClassNames ({ disabled }) {
    const unfocusedLineClassNames = [styles.unfocusedLine]
    if (disabled) {
      unfocusedLineClassNames.push(styles.unfocusedLineDisabled)
    } else {
      unfocusedLineClassNames.push(styles.unfocusedLineColored)
    }
    return unfocusedLineClassNames.join(' ')
  }

  getFocusedLineClassNames ({ hasError, hasFocus }) {
    const focusedLineClassNames = [styles.focusedLine]
    if (hasError || hasFocus) {
      focusedLineClassNames.push(styles.focusedLineFocused)
      if (hasError) {
        focusedLineClassNames.push(styles.focusedLineError)
      } else {
        focusedLineClassNames.push(styles.focusedLineColored)
      }
    }
    return focusedLineClassNames.join(' ')
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
    const {
      focus
    } = this.state
    const hasError = !!error
    const hasFocus = !!focus
    const hasValue = !!value || value === 0

    const inputProps = {
      autoFocus,
      autoComplete: 'off',
      className: styles.input,
      disabled,
      name,
      onBlur: this._onBlur,
      onChange,
      onFocus: this._onFocus,
      ref: this._setInput,
      type,
      value
    }

    return (
      <div
        className={styles.container}
        disabled={disabled}
      >
        <div className={styles.labelPlaceholder}>
          &nbsp;
        </div>

        <div className={styles.content}>
          <div
            className={styles.innerContent}
            style={{position: hasValue ? 'static' : 'relative'}}
          >
            <label
              className={this.getLabelClassNames({ hasError, hasFocus, hasValue })}
              htmlFor={name}
            >
              {label || name}
            </label>

            <input {...inputProps}/>
          </div>
        </div>

        <div className={styles.underlines}>
          <div className={this.getUnfocusedLineClassNames({ disabled })}/>
          <div className={this.getFocusedLineClassNames({ hasError, hasFocus })}/>
        </div>

        <div className={styles.errorContainer}>
          <div
            className={styles.error}
            style={{visibility: hasError ? 'visible' : 'hidden'}}
          >
            {error}
          </div>
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
  type: PropTypes.oneOf(['text']).isRequired, // @TODO: Add more if needed
  value: PropTypes.string.isRequired
}

TextInput.defaultProps = {
  type: 'text'
}
