var React = require('react/addons')
var PureRenderMixin = React.addons.PureRenderMixin
var Icon = require('../../../components/general/Icon')
var EnhancedButton = require('../../../components/buttons/EnhancedButton')

var BikeItem = React.createClass({
  mixins: [PureRenderMixin],

  propTypes: {
    bikes: React.PropTypes.object.isRequired
  },

  render: function () {
      var bikeCount = this.props.bikes.count()
      var placeholderText = null
      if (bikeCount < 2) {
        placeholderText = (
          <div className='bike-item-placeholder-text'>
            {`Please add at least ${bikeCount ? '1 more image' : '2 more images'}`}
          </div>
        )
      }

      return (
        <EnhancedButton className='bike-item bike-item-placeholder'>
          <div className='bike-item-placeholder-icon'>
            <Icon icon='md-add'/>
          </div>
          {placeholderText}
        </EnhancedButton>
      )
  }
})

module.exports = BikeItem
