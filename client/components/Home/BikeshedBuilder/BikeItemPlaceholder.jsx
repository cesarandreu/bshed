require('./bike-item-placeholder.less')

const MAXIMUM_BIKE_COUNT = 12
const React = require('react/addons')
const Icon = require('../../general/Icon')
const PureRenderMixin = React.addons.PureRenderMixin
const EnhancedButton = require('../../general/Buttons/EnhancedButton')

const BikeItem = React.createClass({
  mixins: [
    PureRenderMixin
  ],

  propTypes: {
    bikeCount: React.PropTypes.number,
    onClick: React.PropTypes.func.isRequired
  },

  render () {
      const {bikeCount, onClick} = this.props
      if (bikeCount >= MAXIMUM_BIKE_COUNT)
        return null

      return (
        <EnhancedButton
          className='bike-item bike-item-placeholder'
          onClick={onClick}
        >
          <div className='bike-item-placeholder-icon'>
            <Icon icon='md-add'/>
          </div>
          {bikeCount < 2 && (
            <div className='bike-item-placeholder-text'>
              {`Please add at least ${bikeCount ? '1 more image' : '2 images'}`}
            </div>
          )}
        </EnhancedButton>
      )
  }
})

module.exports = BikeItem
