var React = require('react'),
  {FluxibleMixin} = require('fluxible'),
  BikeshedBuilderHero = require('./BikeshedBuilderHero.jsx'),
  BikeGrid = require('./BikeGrid.jsx'),
  AddBikeButton = require('./AddBikeButton.jsx'),
  BikeshedBuilderAction = require('../../actions/BikeshedBuilder'),
  BikeshedBuilderStore = require('../../stores/BikeshedBuilderStore')

var Home = React.createClass({
  mixins: [FluxibleMixin],
  statics: {
    storeListeners: [BikeshedBuilderStore]
  },
  getInitialState () {
    return this.getStore(BikeshedBuilderStore).getState()
  },
  onChange () {
    this.setState(this.getStore(BikeshedBuilderStore).getState())
  },
  render () {

    var {bikes} = this.state

    return (
      <div className='bikeshed-builder'>
        {!bikes.length && <BikeshedBuilderHero/>}
        <BikeGrid bikes={bikes}/>
        <AddBikeButton inputChange={this._inputChange}/>
      </div>
    )
  },

  _inputChange (e) {
    this.executeAction(BikeshedBuilderAction.addFiles, e.target.files)
  }
})

module.exports = Home
