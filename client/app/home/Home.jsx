var React = require('react/addons'),
  BikeGrid = require('./BikeGrid.jsx'),
  PureRenderMixin = React.addons.PureRenderMixin,
  StoreMixin = require('../../utils/mixins/StoreMixin'),
  ActionMixin = require('../../utils/mixins/ActionMixin'),
  BikeshedBuilderButton = require('./BikeshedBuilderButton.jsx'),
  BikeshedBuilderDialog = require('./BikeshedBuilderDialog.jsx'),
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
    var {bikes, form, dialog} = this.state
    var dialogProps = {
      onFormChange: this._onFormChange,
      closeDialog: this._closeDialog,
      addFiles: this._addFiles,
      dialog,
      form
    }

    return (
      <div className='bikeshed-builder'>
        <BikeGrid bikes={bikes} onBikeClick={this._onBikeClick} onBikeClear={this._onBikeClear}/>

        <BikeshedBuilderButton onClick={this._openDialog}/>
        <BikeshedBuilderDialog {...dialogProps}/>
      </div>
    )
  },

  _addFiles (files) {
    this.executeAction(BikeshedBuilderAction.addFiles, files)
  },

  _closeDialog () {
    this.executeAction(BikeshedBuilderAction.closeDialog)
  },

  _openDialog () {
    this.executeAction(BikeshedBuilderAction.openDialog)
  },

  _onFormChange (formField) {
    this.executeAction(BikeshedBuilderAction.formChange, formField)
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
