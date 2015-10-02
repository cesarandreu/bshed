/**
 * TextInput
 * @flow
 */
import shouldPureComponentUpdate from 'react-pure-render/function'
import type { SyntheticEvent, ReactElement } from 'react'
import React, { Component, PropTypes } from 'react'
import textInputClassNames from './TextInput.css'
import cn from 'classnames'

function keepValidClassNames (result: Array<string>, [className, hasClassName]) {
  if (hasClassName) {
    result.push(className)
  }
  return result
}

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

    const labelClassNames = cn([
      [textInputClassNames.hasFocus, !!focus],
      [textInputClassNames.hasError, !!error],
      [textInputClassNames.hasValue, !!value]
    ].reduce(keepValidClassNames, [textInputClassNames.label]))

    const focusUnderlineClassNames = cn([
      [textInputClassNames.hasFocus, !!focus],
      [textInputClassNames.hasError, !!error]
    ].reduce(keepValidClassNames, [textInputClassNames.focusUnderline]))

    return (
      <div className={textInputClassNames.wrapper}>
        <label
          className={labelClassNames}
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
          className={textInputClassNames.input}
        />
        <hr className={textInputClassNames.underline}/>
        <hr className={focusUnderlineClassNames}/>
        {error ? <div className={textInputClassNames.error}>{error}</div> : null}
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
