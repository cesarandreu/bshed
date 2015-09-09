import './TextField.less'
import cn from 'classnames'
import React, { Component, PropTypes } from 'react'

export default class TextField extends Component {
  static propTypes = {
    label: PropTypes.string,
    error: PropTypes.string,
    className: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  }

  static defaultProps = {
    error: ''
  }

  constructor (props) {
    super(props)
    this.state = {
      focused: false
    }
  }

  render () {
    const {
      label,
      name,
      value,
      error,
      onChange,
      className
    } = this.props
    const { focused } = this.state
    const textFieldClassNames = cn('text-field', className, {
      'text-field-has-focus': focused,
      'text-field-has-error': !!error,
      'text-field-has-value': !!value
    })

    return (
      <div className={textFieldClassNames}>
        <label
          className='text-field-floating-label'
          htmlFor={name}
        >
          {label || name}
        </label>
        <input
          id={name}
          type='text'
          name={name}
          value={value}
          autoComplete='off'
          onChange={onChange}
          className='text-field-input'
          onBlur={this.onBlur.bind(this)}
          onFocus={this.onFocus.bind(this)}
        />
        <hr className='text-field-underline'/>
        <hr className='text-field-focus-underline'/>
        {error &&
          <div className='text-field-error'>
            {error}
          </div>
        }
      </div>
    )
  }

  onBlur () {
    this.setState({ focused: false })
  }

  onFocus () {
    this.setState({ focused: true })
  }
}
