var React = require('react/addons'),
  BikeGrid = require('./BikeGrid.jsx'),
  BikePreview = require('./BikePreview.jsx'),
  AddBikeButton = require('./AddBikeButton.jsx'),
  PureRenderMixin = React.addons.PureRenderMixin,
  StoreMixin = require('../../utils/mixins/StoreMixin'),
  ActionMixin = require('../../utils/mixins/ActionMixin'),
  BikeshedBuilderForm = require('./BikeshedBuilderForm.jsx'),
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
    var {bikes, preview, form} = this.state
    return (
      <div className='bikeshed-builder'>
        <BikeGrid bikes={bikes} onBikeClick={this._onBikeClick} onBikeClear={this._onBikeClear}/>
        <BikeshedBuilderPanel>
          <AddBikeButton inputChange={this._inputChange}/>
          <BikeshedBuilderForm form={form} onFormChange={this._onFormChange}/>
        </BikeshedBuilderPanel>
        <BikePreview preview={preview} closePreview={this._closePreview}/>
      </div>
    )
  },

  _onFormChange (formField) {
    this.executeAction(BikeshedBuilderAction.formChange, formField)
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
