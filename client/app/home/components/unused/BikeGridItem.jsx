var React = require('react/addons'),
  PureRenderMixin = React.addons.PureRenderMixin,
  IconButton = require('../../../components/buttons/IconButton')

var BikeGridItem = React.createClass({
  mixins: [PureRenderMixin],

  propTypes: {
    onBikeClear: React.PropTypes.func.isRequired,
    onBikeClick: React.PropTypes.func.isRequired,
    bike: React.PropTypes.object.isRequired
  },

  render: function () {
    var bike = this.props.bike.toObject()

    return (
      <div className='bike-grid-item'>
        <div className='bike-item-metadata'>
          <div className='bike-item-name' title={bike.name}>{bike.name}</div>
          <IconButton className='bike-item-clear' icon='md-clear' onClick={this._onBikeClear}/>
        </div>
        <div className='bike-item-image' onClick={this._onBikeClick}>
          <img src={bike.url} alt={bike.file.name}/>
        </div>
      </div>
    )
  },

  _onBikeClear: function () {
    this.props.onBikeClear(this.props.bike.get('name'))
  },

  _onBikeClick: function () {
    this.props.onBikeClick(this.props.bike.get('name'))
  }

})

module.exports = BikeGridItem
