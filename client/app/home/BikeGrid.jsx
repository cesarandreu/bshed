var React = require('react'),
  classnames = require('classnames'),
  BikeGridItem = require('./BikeGridItem.jsx')

var BikeGrid = React.createClass({
  propTypes: {
    onBikeClear: React.PropTypes.func.isRequired,
    onBikeClick: React.PropTypes.func.isRequired,
    bikes: React.PropTypes.array.isRequired
  },
  render: function () {
    var {bikes} = this.props
    var className = classnames(
      {'empty': !bikes.length},
      'bike-grid-container',
      'grid-container'
    )

    return (
      <div className={className}>
        <div className='bike-grid-subheader grid-subheader'>
          Bikes
        </div>
        <div className='bike-grid grid'>
          {bikes.map((bike, key) =>
            <BikeGridItem
              onBikeClear={this.props.onBikeClear}
              onBikeClick={this.props.onBikeClick}
              bike={bike}
              key={key}/>
          )}
        </div>
      </div>
    )
  }

})

module.exports = BikeGrid
