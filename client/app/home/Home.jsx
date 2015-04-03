var React = require('react/addons'),
  BikeGrid = require('./BikeGrid.jsx'),
  BikePreview = require('./BikePreview.jsx'),
  AddBikeButton = require('./AddBikeButton.jsx'),
  PureRenderMixin = React.addons.PureRenderMixin,
  StoreMixin = require('../../utils/mixins/StoreMixin'),
  ActionMixin = require('../../utils/mixins/ActionMixin'),
  BikeshedBuilderHero = require('./BikeshedBuilderHero.jsx'),
  BikeshedBuilderPanel = require('./BikeshedBuilderPanel.jsx'),
  BikeshedBuilderAction = require('../../actions/BikeshedBuilder'),
  BikeshedBuilderStore = require('../../stores/BikeshedBuilderStore')

var Home = React.createClass({
  mixins: [ActionMixin, PureRenderMixin, StoreMixin],
  statics: {
    storeListeners: [BikeshedBuilderStore]
  },

  getInitialState () {
    return this.getStore(BikeshedBuilderStore).getState()
  },

  onChange () {
    this.setState(this.getInitialState())
  },

  render () {
    var {bikes, preview} = this.state
    return (
      <div className='bikeshed-builder'>
        {!bikes.length && <BikeshedBuilderHero/>}
        <BikeGrid bikes={bikes} onBikeClick={this._onBikeClick} onBikeClear={this._onBikeClear}/>
        <BikeshedBuilderPanel>
          <AddBikeButton inputChange={this._inputChange}/>
          <div>SHIP IT~</div>
        </BikeshedBuilderPanel>
        <BikePreview preview={preview} closePreview={this._closePreview}/>
      </div>
    )
  },

  _inputChange (e) {
    this.executeAction(BikeshedBuilderAction.addFiles, e.target.files)
  },

  _closePreview () {
    this.executeAction(BikeshedBuilderAction.closePreview)
  },

  _onBikeClick (bikeName) {
    this.executeAction(BikeshedBuilderAction.openPreview, bikeName)
  },

  _onBikeClear (bikeName) {
    this.executeAction(BikeshedBuilderAction.removeBike, bikeName)
  }

})

module.exports = Home

/*

bottom text area is 48px
text padding 16px
grid padding 4px or 1px

card height is 148px
card width is 180px

*/
