require('./BikePreview.less')
const React = require('react/addons')
const hotkey = require('react-hotkey')
const PureRenderMixin = React.addons.PureRenderMixin
const IconButton = require('../../general/Buttons/IconButton')

/**
 * Bike preview
 * Full-screen image
 */
const BikePreview = React.createClass({
  mixins: [
    PureRenderMixin,
    hotkey.Mixin('_handleHotkey')
  ],

  propTypes: {
    /**
     * Image url
     */
    url: React.PropTypes.string,

    /**
     * Image name
     */
    name: React.PropTypes.string,

    /**
     * Closing action
     * Called when you press Escape, hit the X button, or you click outside the image
     */
    onClose: React.PropTypes.func.isRequired
  },

  getDefaultProps () {
    return {
      name: '',
      url: ''
    }
  },

  render () {
    const {name, url, onClose} = this.props
    if (!url || !name)
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
            alt={name}
            src={url}
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
