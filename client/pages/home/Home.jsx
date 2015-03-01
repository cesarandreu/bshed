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
        <div className='bikeshed-builder-body'>
          {/*<BikeGrid bikes={this.state.bikes}/>*/}
        </div>
        <AddBikeButton inputChange={this._inputChange}/>
      </div>
    )
  },

  _inputChange (e) {
    console.log('file received', e);
  }

})

module.exports = Home
