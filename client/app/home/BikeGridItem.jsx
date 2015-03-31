var React = require('react'),
  IconButton = require('../../components/buttons/IconButton.jsx')

var BikeGridItem = React.createClass({
  propTypes: {
    onBikeClear: React.PropTypes.func.isRequired,
    onBikeClick: React.PropTypes.func.isRequired
  },
  render: function () {
    var {bike} = this.props
    return (
      <div className='bike-item'>
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
    this.props.onBikeClear(this.props.bike.name)
  },

  _onBikeClick: function () {
    this.props.onBikeClick(this.props.bike.name)
  }

})

module.exports = BikeGridItem
