require('./BikePlaceholder.less')

const MAXIMUM_BIKE_COUNT = 12
const React = require('react/addons')
const Icon = require('../../general/Icon')
const GridItem = require('../../general/GridItem')
const PureRenderMixin = React.addons.PureRenderMixin
const EnhancedButton = require('../../general/Buttons/EnhancedButton')

const BikePlaceholder = React.createClass({
  mixins: [
    PureRenderMixin
  ],

  propTypes: {
    bikeCount: React.PropTypes.number.isRequired,
    onClick: React.PropTypes.func.isRequired
  },

  render () {
      const {bikeCount, onClick} = this.props
      if (bikeCount >= MAXIMUM_BIKE_COUNT)
        return null

      return (
        <GridItem className='bike-placeholder-container'>
          <EnhancedButton
            className='bike-placeholder'
            onClick={onClick}
          >
            <div className='bike-placeholder-icon'>
              <Icon icon='md-add'/>
            </div>
            {bikeCount < 2 && (
              <div className='bike-placeholder-text'>
                {`Please add at least ${bikeCount ? '1 more image' : '2 images'}`}
              </div>
            )}
          </EnhancedButton>
        </GridItem>
      )
  }
})

module.exports = BikePlaceholder
