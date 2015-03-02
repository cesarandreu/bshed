var React = require('react'),
  {FluxibleMixin} = require('fluxible'),
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
    return (
      <div className='bikeshed-builder'>
        <BikeGrid bikes={this.state.bikes}/>
        <AddBikeButton inputChange={this._inputChange}/>
      </div>
    )
  },

  _receivedFiles (files) {
    this.executeAction(BikeshedBuilderAction.addFiles, files)
  },

  _inputChange (e) {
    this._receivedFiles(e.target.files)
  },

  _fileDropped (e) {
    this._receivedFiles(e.dataTransfer.files)
  }
})

module.exports = Home
