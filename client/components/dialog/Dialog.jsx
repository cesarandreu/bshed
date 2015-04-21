var cn = require('classnames'),
  React = require('react/addons'),
  hotkey = require('react-hotkey'),
  PureRenderMixin = React.addons.PureRenderMixin

var Dialog = React.createClass({
  mixins: [
    PureRenderMixin,
    hotkey.Mixin('_handleHotkey')
  ],

  propTypes: {
    onClose: React.PropTypes.func.isRequired
  },

  render: function () {
    var {children, className, ...other} = this.props
    return (
      <div className={cn('dialog-wrapper', className)} {...other}>
        <div className='dialog-overlay'></div>
        <div className='dialog-container' onClick={this._onClick}>
          <div className='dialog'>
            {children}
          </div>
        </div>
      </div>
    )
  },

  _onClick: function (e) {
    if (e.target.classList.contains('dialog-container'))
      this.props.onClose()
  },

  _handleHotkey: function (e) {
    if (e.key === 'Escape') {
      this.props.onClose()
      e.stopPropagation()
    }
  }

})

module.exports = Dialog
