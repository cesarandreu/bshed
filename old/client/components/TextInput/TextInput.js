/**
 * TextInput
 * @flow
 */
import shouldPureComponentUpdate from 'react-pure-render/function'
import type { SyntheticEvent, ReactElement } from 'react'
import React, { Component, PropTypes } from 'react'
import cn from './TextInput.css'

export class TextInput extends Component {
  constructor (props: Object) {
    super(props)
    this.state = { focus: false }
    this._onBlur = this._onBlur.bind(this)
    this._onFocus = this._onFocus.bind(this)
    this._onKeyDown = this._onKeyDown.bind(this)
  }

  _onFocus () {
    this.setState({ focus: true })
  }

  _onBlur () {
    this.setState({ focus: false })
  }

  _onKeyDown (e: SyntheticEvent) {
    if (e.key === 'Escape') {
      this.refs.input.blur()
    }
  }

  render (): ReactElement {
    const { disabled, name, error, label, value, onChange } = this.props
    const { focus } = this.state

    const hasFocus = focus ? cn.hasFocus : ''
    const hasError = error ? cn.hasError : ''
    const hasValue = value ? cn.hasValue : ''
    return (
      <div className={cn.wrapper}>
        <label
          className={`${hasFocus} ${hasError} ${hasValue} ${cn.label}`}
          htmlFor={name}
        >
          {label || name}
        </label>
        <input
          ref='input'
          type='text'
          name={name}
          value={value}
          autoComplete='off'
          disabled={disabled}
          onChange={onChange}
          onBlur={this._onBlur}
          onFocus={this._onFocus}
          onKeyDown={this._onKeyDown}
          className={cn.input}
        />
        <hr className={cn.underline}/>
        <hr className={`${hasFocus} ${hasError} ${cn.focusUnderline}`}/>
        {error ? <div className={cn.error}>{error}</div> : null}
      </div>
    )
  }
}
TextInput.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  disabled: PropTypes.bool,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}
TextInput.prototype.shouldComponentUpdate = shouldPureComponentUpdate
