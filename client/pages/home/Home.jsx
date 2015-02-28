var React = require('react'),
  {FluxibleMixin} = require('fluxible'),
  // BikeGrid = require('./BikeGrid.jsx'),
  BuildBikeshedButton = require('./BuildBikeshedButton.jsx'),
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
    var buildBikeshedPosition = this.state.bikes.length ? 'side' : 'center'

    return (
      <div className='bikeshed-builder'>
        <div className='bikeshed-builder-main'>
          {/*<BikeGrid bikes={this.state.bikes}/>*/}
          <BuildBikeshedButton fileReceived={this._fileReceived} position={buildBikeshedPosition}/>
        </div>
        <div className='bikeshed-builder-panel'></div>
      </div>
    )
  },

  _fileReceived (e) {
    console.log('FILE RECEIVED', e)
  }

})

module.exports = Home
