var React = require('react'),
  classnames = require('classnames'),
  BikeGridItem = require('./BikeGridItem.jsx')

var BikeGrid = React.createClass({

  render: function () {
    var {bikes} = this.props
    var items = bikes.map((bike, key) =>
      <BikeGridItem key={key} bike={bike} onBikeClick={this.props.onBikeClick}/>
    )

    return (
      <div className={classnames('bike-grid-container grid-container', {'empty': !bikes.length})}>
        <div className='bike-grid-subheader grid-subheader'>
          Bikes
        </div>
        <div className='bike-grid grid'>
          {items}
        </div>
      </div>
    )
  }

})

module.exports = BikeGrid
