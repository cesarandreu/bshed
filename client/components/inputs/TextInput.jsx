var cn = require('classnames'),
  React = require('react/addons'),
  {PureRenderMixin} = React.addons.PureRenderMixin


var TextInput = React.createClass({
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
    var wrapperClassNames = cn('text-input-wrapper', {
      'has-focus': this.state.focused,
      'has-error': !!errorText
    })
    var inputProps = {
      name, value, onChange,
      onFocus: this._onFocus,
      onBlur: this._onBlur
    }
    return (
      <div className={wrapperClassNames}>
        <label className='text-input-floating-label'>
          {label || name}
        </label>
        <input className='text-input' type='text' {...inputProps}/>
        <hr className='text-input-underline'/>
        <hr className='text-input-focus-underline'/>
        {errorText ? <div className='text-input-error-text'>{errorText}</div> : null}
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


module.exports = TextInput
