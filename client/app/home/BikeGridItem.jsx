var React = require('react')
  // IconButton = require('../../components/buttons/IconButton.jsx')

var BikeGridItem = React.createClass({

  render: function () {
    var {bike} = this.props
    return (
      <div className='bike-item' onClick={this._onClick}>
        {/*<IconButton className='bike-item-action' icon='md-info'/>*/}
        <div className='bike-item-image'>
          <img src={bike.url}/>
        </div>
        <div className='bike-item-metadata'>
          <div className='bike-item-name'>{bike.name}</div>
        </div>
      </div>
    )
  },

  _onClick: function () {
    this.props.onBikeClick(this.props.bike.name)
  }

})

module.exports = BikeGridItem
