var React = require('react/addons'),
  hotkey = require('react-hotkey'),
  PureRenderMixin = React.addons.PureRenderMixin,
  IconButton = require('../../../components/buttons/IconButton')

var BikePreview = React.createClass({
  mixins: [PureRenderMixin, hotkey.Mixin('_handleHotkey')],
  propTypes: {
    closePreview: React.PropTypes.func.isRequired,
    preview: React.PropTypes.string.isRequired,
    bikes: React.PropTypes.object.isRequired
  },
  render: function () {
    var {preview, bikes} = this.props
    if (!preview)
      return null

    var bike = bikes.get(preview)
    return (
      <div className='bike-preview-container'>
        <div className='bike-preview' onClick={this._closeOnClick}>
          <IconButton
            onClick={this.props.closePreview}
            className='bike-preview-close'
            icon='md-clear'/>
          <img className='bike-preview-image' src={bike.get('url')} alt={bike.get('name')}/>
        </div>
        <div className='bike-preview-overlay'></div>
      </div>
    )
  },

  _closeOnClick: function (e) {
    if (e.target.classList.contains('bike-preview'))
      this.props.closePreview()
  },

  _handleHotkey: function (e) {
    if (e.key === 'Escape') {
      this.props.closePreview()
      e.stopPropagation()
    }
  }

})

module.exports = BikePreview
