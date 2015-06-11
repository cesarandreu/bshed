require('./BikePlaceholder.less')

const MAXIMUM_BIKE_COUNT = 5
const React = require('react')
const Icon = require('../../general/Icon')
const GridItem = require('../../general/GridItem')
const ImmutableRenderMixin = require('react-immutable-render-mixin')
const EnhancedButton = require('../../general/Buttons/EnhancedButton')

const BikePlaceholder = React.createClass({
  mixins: [
    ImmutableRenderMixin
  ],

  propTypes: {
    itemCount: React.PropTypes.number.isRequired,
    onClick: React.PropTypes.func.isRequired
  },

  render () {
    const {itemCount, onClick} = this.props
    if (itemCount >= MAXIMUM_BIKE_COUNT) {
      return null
    }

    return (
      <GridItem className='bike-placeholder-container'>
        <EnhancedButton
          className='bike-placeholder'
          onClick={onClick}
        >
          <div className='bike-placeholder-icon'>
            <Icon icon='md-add'/>
          </div>
          {itemCount < 2 && (
            <div className='bike-placeholder-text'>
              {`Please add at least ${itemCount ? '1 more image' : '2 images'}`}
            </div>
          )}
        </EnhancedButton>
      </GridItem>
    )
  }
})

module.exports = BikePlaceholder
