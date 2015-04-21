var React = require('react/addons'),
  PureRenderMixin = React.addons.PureRenderMixin,
  {connectToStores} = require('fluxible/addons'),
  ActionMixin = require('../../../utils/mixins/ActionMixin'),
  BikeshedBuilderButton = require('./BikeshedBuilderButton'),
  BikeshedBuilderDialog = require('./BikeshedBuilderDialog'),
  BikeshedBuilderStore = require('../stores/BikeshedBuilderStore'),
  BikeshedBuilderActions = require('../actions/BikeshedBuilderActions')

var Home = React.createClass({
  mixins: [ActionMixin, PureRenderMixin],

  render () {
    var {bikes, form, dialog} = this.props
    var dialogProps = {
      onFormChange: this._onFormChange,
      onBikeClear: this._onBikeClear,
      closeDialog: this._closeDialog,
      addFiles: this._addFiles,
      dialog,
      bikes,
      form
    }
    return (
      <div className='bikeshed-builder'>
        <BikeshedBuilderButton onClick={this._openDialog}/>
        <BikeshedBuilderDialog {...dialogProps}/>
      </div>
    )
  },

  _addFiles (files) {
    this.executeAction(BikeshedBuilderActions.addFiles, files)
  },

  _closeDialog () {
    this.executeAction(BikeshedBuilderActions.closeDialog)
  },

  _openDialog () {
    this.executeAction(BikeshedBuilderActions.openDialog)
  },

  _onFormChange (formField) {
    this.executeAction(BikeshedBuilderActions.formChange, formField)
  },

  _onBikeClear (bikeName) {
    this.executeAction(BikeshedBuilderActions.removeBike, bikeName)
  }
})

Home = connectToStores(Home, [BikeshedBuilderStore], stores => {
  return stores.BikeshedBuilderStore.getState()
})

module.exports = Home
