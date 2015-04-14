var cn = require('classnames'),
  React = require('react/addons'),
  {PureRenderMixin} = React.addons.PureRenderMixin

var TextField = React.createClass({
  mixins: [PureRenderMixin],

  propTypes: {
    label: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    className: React.PropTypes.string,
    name: React.PropTypes.string.isRequired,
    value: React.PropTypes.string.isRequired,
    checked: React.propTypes.bool.isRequired,
    onChange: React.PropTypes.func.isRequired
  },

  getInitialState: function () {
    return {focused: false}
  },

  render: function () {
    var {name, label, value, checked, disabled, onChange, className} = this.props
    var wrapperClassNames = cn(className, 'checkbox', {
      'has-focus': this.state.focused,
      'is-disabled': !!disabled,
      'is-checkbox': !!checked
    })
    var inputProps = {
      name, value, onChange, checked,
      onFocus: this._onFocus,
      onBlur: this._onBlur
    }
    return (
      <div className={wrapperClassNames}>
      <input className='checkbox-input' type='checkbox' {...inputProps}/>
        <label className='checkbox-label'>
          {label || name}
        </label>
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
