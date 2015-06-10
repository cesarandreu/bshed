require('./BikePreview.less')

const React = require('react/addons')
const hotkey = require('react-hotkey')
const IconButton = require('../../general/Buttons/IconButton')
const eventHasModifier = require('../../../lib/eventHasModifier')
const ImmutableRenderMixin = require('react-immutable-render-mixin')

/**
 * Bike preview
 * Full-screen image
 */
const BikePreview = React.createClass({
  mixins: [
    ImmutableRenderMixin,
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
    onClose: React.PropTypes.func,

    /**
     * Next action
     * Called when you press RightArrow
     */
     onNext: React.PropTypes.func,

     /**
      * Previous action
      * Called when you press LeftArrow
      */
    onPrevious: React.PropTypes.func
  },

  getDefaultProps () {
    return {
      name: '',
      url: ''
    }
  },

  render () {
    const {name, url, onClose} = this.props
    if (!url || !name) {
      return null
    }

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
    if (e.target.classList.contains('bike-preview')) {
      this.props.onClose()
    }
  },

  _handleHotkey (e) {
    const {url, name} = this.props
    if (!eventHasModifier(e) && url && name) {
      if (e.key === 'Escape' && this.props.onClose) {
        this.props.onClose(e)
        e.stopPropagation()
      } else if (e.key === 'ArrowLeft' && this.props.onPrevious) {
        this.props.onPrevious(e)
        e.stopPropagation()
      } else if (e.key === 'ArrowRight' && this.props.onNext) {
        this.props.onNext(e)
        e.stopPropagation()
      }
    }
  }
})

module.exports = BikePreview
