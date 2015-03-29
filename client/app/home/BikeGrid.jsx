var React = require('react'),
  classnames = require('classnames'),
  BikeGridItem = require('./BikeGridItem.jsx')

var BikeGrid = React.createClass({

  render: function () {
    var {bikes} = this.props
    var className = classnames(
      'bike-grid-container grid-container',
      {'empty': !bikes.length}
    )

    return (
      <div className={className}>
        <div className='bike-grid-subheader grid-subheader'>
          Bikes
        </div>
        <div className='bike-grid grid'>
          {bikes.map((bike, key) =>
            <BikeGridItem key={key} bike={bike} onBikeClick={this.props.onBikeClick}/>
          )}
        </div>
      </div>
    )
  }

})

module.exports = BikeGrid
