var React = require('react/addons'),
  PureRenderMixin = React.addons.PureRenderMixin,
  IconButton = require('../../../components/buttons/IconButton.jsx')

var BikeItem = React.createClass({
  mixins: [PureRenderMixin],

  propTypes: {
    onBikeClear: React.PropTypes.func.isRequired,
    // onBikeClick: React.PropTypes.func.isRequired,
    bike: React.PropTypes.object.isRequired
  },

  render: function () {
    var {bike} = this.props

    return (
      <div className='bike-item'>
        <IconButton className='bike-item-clear' icon='md-clear' onClick={this._onBikeClear}/>
        <div className='bike-item-image'>
          <img src={bike.get('url')} alt={bike.get('file').name}/>
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

module.exports = BikeItem
