require('./TextField.less')

const cn = require('classnames')
const React = require('react/addons')
const {PureRenderMixin} = React.addons.PureRenderMixin

const TextField = React.createClass({
  mixins: [PureRenderMixin],

  propTypes: {
    label: React.PropTypes.string,
    error: React.PropTypes.string,
    className: React.PropTypes.string,
    name: React.PropTypes.string.isRequired,
    value: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired
  },

  getInitialState () {
    return {
      focused: false
    }
  },

  render () {
    const {name, error, label, value, onChange, className} = this.props
    const wrapperClassNames = cn('text-field', className, {
      'has-focus': this.state.focused,
      'has-error': !!error,
      'has-value': !!value
    })
    return (
      <div className={wrapperClassNames}>
        <label className='text-field-floating-label'>
          {label || name}
        </label>
        <input
          className='text-field-input'
          type='text'
          name={name}
          value={value}
          autoComplete='off'
          onChange={onChange}
          onBlur={this._onBlur}
          onFocus={this._onFocus}
        />
        <hr className='text-field-underline'/>
        <hr className='text-field-focus-underline'/>
        {error ? <div className='text-field-error'>{error}</div> : null}
      </div>
    )
  },

  _onFocus () {
    this.setState({focused: true})
  },

  _onBlur () {
    this.setState({focused: false})
  }

})

module.exports = TextField
