require('./BikeGrid.less')

const React = require('react')
const Immutable = require('immutable')
const Grid = require('../../general/Grid')
const GridCard = require('../../general/GridCard')
const BikeImage = require('../../shared/BikeImage')
const ActionMixin = require('../../../lib/ActionMixin')
const BikeshedActions = require('../../../actions/BikeshedActions')
const ImmutableRenderMixin = require('react-immutable-render-mixin')

const BikeGrid = React.createClass({
  mixins: [
    ActionMixin,
    ImmutableRenderMixin
  ],

  propTypes: {
    bikeshed: React.PropTypes.instanceOf(Immutable.Map).isRequired,
    bikes: React.PropTypes.instanceOf(Immutable.Map).isRequired
  },

  render () {
    const {bikeshed, bikes} = this.props

    return (
      <Grid
        className='bike-grid'
        subheader='Bikes'
      >
        {bikes.sort(bike => bike.get('score')).map(bike => {
          const id = bike.get('id')
          return (
            <GridCard
              key={id}
              width={212}
              height={260}
              className='bike-grid-item'
              onClick={() => this._preview(id)}
            >
              <BikeImage
                size={212}
                className='bike-grid-image'
                height={bike.get('height')}
                width={bike.get('width')}
                name={bike.get('name')}
                url={`http://localhost:10001/bshed/${bikeshed.get('id')}/${id}`}
              />
              <div className='bike-grid-item-details'>
                Score {bike.get('score')}
              </div>
            </GridCard>
          )
        }).toArray()}
      </Grid>
    )
  },

  _preview (bikeId) {
    this.executeAction(BikeshedActions.preview, bikeId)
  }
})

module.exports = BikeGrid