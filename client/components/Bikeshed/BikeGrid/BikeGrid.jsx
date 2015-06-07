require('./BikeGrid.less')

const React = require('react/addons')
const Immutable = require('immutable')
const Grid = require('../../general/Grid')
const GridItem = require('../../general/GridItem')
const BikeImage = require('../../shared/BikeImage')
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
          return (
            <GridItem className='bike-grid-item' key={id}>
              <BikeImage
                height={bike.get('height')}
                width={bike.get('width')}
                name={bike.get('name')}
                url={`http://localhost:10001/bshed/${bikeshed.get('id')}/${id}`}
              />
            </GridItem>
          )
        })}
      </Grid>
    )
  }
})

module.exports = BikeGrid
