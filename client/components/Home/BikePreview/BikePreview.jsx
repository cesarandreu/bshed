require('./bike-preview.less')

const React = require('react/addons')
const Immutable = require('immutable')
const hotkey = require('react-hotkey')
const PureRenderMixin = React.addons.PureRenderMixin
const ActionMixin = require('../../../lib/ActionMixin')
const IconButton = require('../../general/Buttons/IconButton')
const BikeshedBuilderActions = require('../../../actions/BikeshedBuilderActions')

const BikePreview = React.createClass({
  mixins: [
    ActionMixin,
    PureRenderMixin,
    hotkey.Mixin('_handleHotkey')
  ],

  propTypes: {
    preview: React.PropTypes.instanceOf(Immutable.Map)
  },

  render () {
    const {preview} = this.props
    if (!preview)
      return null

    return (
      <div className='bike-preview-container'>
        <div className='bike-preview' onClick={this._closeOnClick}>
          <IconButton
            onClick={this._closePreview}
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

  _closePreview () {
    this.executeAction(BikeshedBuilderActions.preview, '')
  },

  _closeOnClick (e) {
    if (e.target.classList.contains('bike-preview'))
      this._closePreview()
  },

  _handleHotkey (e) {
    if (e.key === 'Escape') {
      this._closePreview()
      e.stopPropagation()
    }
  }
})

module.exports = BikePreview
