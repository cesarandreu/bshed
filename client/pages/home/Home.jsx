var React = require('react'),
  {FluxibleMixin} = require('fluxible'),
  // BikeGrid = require('./BikeGrid.jsx'),
  AddBikeButton = require('./AddBikeButton.jsx'),
  BikeshedBuilderStore = require('../../stores/BikeshedBuilderStore')

var Home = React.createClass({
  mixins: [FluxibleMixin],
  statics: {
    storeListeners: [BikeshedBuilderStore]
  },
  getInitialState: function () {
    return this.getStore(BikeshedBuilderStore).getState()
  },

  onChange: function () {
    this.setState(this.getStore(BikeshedBuilderStore).getState())
  },
  render: function () {
    return (
      <div className='bikeshed-builder'>
        <div className='bikeshed-builder-main'>
          {/*<BikeGrid bikes={this.state.bikes}/>*/}
          <AddBikeButton/>
        </div>
        <div className='bikeshed-builder-panel'></div>
      </div>
    )
  }
})

module.exports = Home
