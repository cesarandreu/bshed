require('./bike-grid.less')

const BIKE_ITEM_SIZE = 160
const cn = require('classnames')
const React = require('react/addons')
const Immutable = require('immutable')
const Grid = require('../../general/Grid')
const PureRenderMixin = React.addons.PureRenderMixin

const BikeGrid = React.createClass({
  mixins: [
    PureRenderMixin
  ],

  propTypes: {
    bikeshed: React.PropTypes.instanceOf(Immutable.Map).isRequired,
    bikes: React.PropTypes.instanceOf(Immutable.Map).isRequired
  },

  render () {
    const {bikeshed, bikes} = this.props

    return (
      <Grid className='bike-grid'>
        {bikeshed.get('Bikes').map(id => {
          const bike = bikes.get(id)
          const width = bike.get('width')
          const height = bike.get('height')

          const imageContainerClassName = cn('bike-grid-item-image-container', {
            small: width < BIKE_ITEM_SIZE || height < BIKE_ITEM_SIZE,
            square: width === height,
            longer: height > width,
            wider: width > height
          })

          return (
            <div className='bike-grid-item' key={id}>
              <div className={imageContainerClassName}>
                <img
                  className='bike-grid-item-image'
                  alt={bike.get('name')}
                  src={`http://localhost:10001/bshed/${bikeshed.get('id')}/${id}`}
                />
              </div>

            </div>
          )

        })}
      </Grid>
    )
  }
})

module.exports = BikeGrid
