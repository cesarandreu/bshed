var React = require('react'),
  {FluxibleMixin} = require('fluxible'),
  classnames = require('classnames'),
  BikeshedBuilderAction = require('../../actions/BikeshedBuilder'),
  IconButton = require('../../components/buttons/IconButton.jsx')

var BikeGrid = React.createClass({
  mixins: [FluxibleMixin],

  render: function () {
    var {bikes} = this.props
    var items = bikes.map((bike, key) => {
      return (
        <div className='bike-item' key={key}>
          <div className='bike-item-image'>
            <img src={bike.url}/>
          </div>
          <div className='bike-item-info'>
            <div className='bike-item-name'>{bike.name}</div>
            <IconButton className='bike-item-action' icon='md-info'/>

          </div>

        </div>
      )
    })

    return (
      <div className={classnames('bike-grid', {'empty': !bikes.length})}>
        {items}
      </div>
    )
  }

})

module.exports = BikeGrid
