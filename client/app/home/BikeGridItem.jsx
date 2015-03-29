var React = require('react'),
  IconButton = require('../../components/buttons/IconButton.jsx')

var BikeGridItem = React.createClass({

  render: function () {
    var {bike} = this.props
    return (
      <div className='bike-item' onClick={this._onClick}>
        <div className='bike-item-metadata'>
          <div className='bike-item-name' title={bike.name}>{bike.name}</div>
          <IconButton className='bike-item-clear' icon='md-clear'/>
        </div>
        <div className='bike-item-image'>
          <img src={bike.url} alt={bike.file.name}/>
        </div>
      </div>
    )
  },

  _onClick: function () {
    this.props.onBikeClick(this.props.bike.name)
  }

})

module.exports = BikeGridItem
