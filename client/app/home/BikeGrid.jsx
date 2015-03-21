var React = require('react'),
  classnames = require('classnames'),
  IconButton = require('../../components/buttons/IconButton.jsx')

var BikeGrid = React.createClass({

  render: function () {
    var {bikes} = this.props
    var items = bikes.map((bike, key) => {
      return (
        <div className='bike-item' key={key}>
          {/*<IconButton className='bike-item-action' icon='md-info'/>*/}
          <div className='bike-item-image'>
            <img src={bike.url}/>
          </div>
          <div className='bike-item-metadata'>
            <div className='bike-item-name'>{bike.name}</div>
          </div>

        </div>
      )
    })

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