var React = require('react/addons'),
  hotkey = require('react-hotkey'),
  PureRenderMixin = React.addons.PureRenderMixin,
  IconButton = require('../../components/buttons/IconButton.jsx')

var BikePreview = React.createClass({
  mixins: [PureRenderMixin, hotkey.Mixin('_handleHotkey')],
  propTypes: {
    closePreview: React.PropTypes.func.isRequired,
    preview: React.PropTypes.object.isRequired
  },
  render: function () {
    var {bike} = this.props.preview

    if (!bike)
      return null

    return (
      <div className='bike-preview'>
        <div className='bike-preview-content' onClick={this._closeOnClick}>
          <IconButton
            onClick={this.props.closePreview}
            className='bike-preview-close'
            icon='md-clear'/>
          <img className='bike-preview-image' src={bike.url} alt={bike.file.name}/>
        </div>
        <div className='bike-preview-overlay'></div>
      </div>
    )
  },

  _closeOnClick: function (e) {
    if (e.target.className.indexOf('bike-preview-content') > -1)
      this.props.closePreview()
  },

  _handleHotkey: function (e) {
    if (e.key === 'Escape')
      this.props.closePreview()
  }

})

module.exports = BikePreview
