require('./bike-preview.less')

const React = require('react/addons')
const Immutable = require('immutable')
const hotkey = require('react-hotkey')
const PureRenderMixin = React.addons.PureRenderMixin
const IconButton = require('../../general/Buttons/IconButton')

const BikePreview = React.createClass({
  mixins: [
    PureRenderMixin,
    hotkey.Mixin('_handleHotkey')
  ],

  propTypes: {
    preview: React.PropTypes.instanceOf(Immutable.Map),
    onClose: React.PropTypes.func.isRequired
  },

  render () {
    const {preview, onClose} = this.props
    if (!preview)
      return null

    return (
      <div className='bike-preview-container'>
        <div className='bike-preview' onClick={this._closeOnClick}>
          <IconButton
            onClick={onClose}
            className='bike-preview-close'
            icon='md-clear'/>
          <img
            className='bike-preview-image'
            alt={preview.get('name')}
            src={preview.get('url')}
          />
        </div>
        <div className='bike-preview-overlay'/>
      </div>
    )
  },

  _closeOnClick (e) {
    if (e.target.classList.contains('bike-preview'))
      this.props.onClose()
  },

  _handleHotkey (e) {
    if (e.key === 'Escape') {
      this.props.onClose()
      e.stopPropagation()
    }
  }
})

module.exports = BikePreview
