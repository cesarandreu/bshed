var cn = require('classnames'),
  React = require('react/addons'),
  {PureRenderMixin} = React.addons.PureRenderMixin

var TextField = React.createClass({
  mixins: [PureRenderMixin],

  propTypes: {
    label: React.PropTypes.string,
    errorText: React.PropTypes.string,
    name: React.PropTypes.string.isRequired,
    value: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired
  },

  getInitialState: function () {
    return {focused: false}
  },

  render: function () {
    var {name, errorText, label, value, onChange} = this.props
    var wrapperClassNames = cn('text-field', {
      'has-focus': this.state.focused,
      'has-error': !!errorText,
      'has-value': !!value
    })
    var inputProps = {
      name, value, onChange,
      onFocus: this._onFocus,
      onBlur: this._onBlur
    }
    return (
      <div className={wrapperClassNames}>
        <label className='text-field-floating-label'>
          {label || name}
        </label>
        <input className='text-field-input' type='text' {...inputProps}/>
        <hr className='text-field-underline'/>
        <hr className='text-field-focus-underline'/>
        {errorText ? <div className='text-field-error'>{errorText}</div> : null}
      </div>
    )
  },

  _onFocus: function () {
    this.setState({focused: true})
  },

  _onBlur: function () {
    this.setState({focused: false})
  }

})

module.exports = TextField
