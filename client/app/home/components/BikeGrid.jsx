var React = require('react/addons'),
  BikeGridItem = require('./BikeGridItem'),
  PureRenderMixin = React.addons.PureRenderMixin,
  BikeshedBuilderHero = require('./BikeshedBuilderHero')

var BikeGrid = React.createClass({
  mixins: [PureRenderMixin],

  propTypes: {
    onBikeClear: React.PropTypes.func.isRequired,
    onBikeClick: React.PropTypes.func.isRequired,
    bikes: React.PropTypes.object.isRequired
  },

  render: function () {
    var {bikes, onBikeClick, onBikeClear} = this.props

    if (!bikes.count())
      return <BikeshedBuilderHero/>

    return (
      <div className='bike-grid-container grid-container'>
        <div className='bike-grid-subheader grid-subheader'>
          Bikes
        </div>
        <div className='bike-grid grid'>
          {bikes.toArray().map((bike, key) =>
            <BikeGridItem
              onBikeClear={onBikeClear}
              onBikeClick={onBikeClick}
              bike={bike}
              key={key}/>
          )}
        </div>
      </div>
    )
  }

})

module.exports = BikeGrid
