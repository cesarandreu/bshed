require('./Dialog.less')

const cn = require('classnames')
const React = require('react/addons')
const hotkey = require('react-hotkey')
const PureRenderMixin = React.addons.PureRenderMixin

const Dialog = React.createClass({
  mixins: [
    PureRenderMixin,
    hotkey.Mixin('_handleHotkey')
  ],

  propTypes: {
    onClose: React.PropTypes.func.isRequired
  },

  render () {
    const {children, className, ...other} = this.props
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

  _onClick (e) {
    if (e.target.classList.contains('dialog-container'))
      this.props.onClose()
  },

  _handleHotkey (e) {
    if (e.key === 'Escape') {
      this.props.onClose()
      e.stopPropagation()
    }
  }

})

module.exports = Dialog
