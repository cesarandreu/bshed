// TODO
// * When you've added images, add an unload listener so people don't fuck up
// * Open image overlay on click

var React = require('react/addons'),
  BikePreview = require('./BikePreview'),
  PureRenderMixin = React.addons.PureRenderMixin,
  {connectToStores} = require('fluxible/addons'),
  BikeshedBuilder = require('./BikeshedBuilder'),
  ActionMixin = require('../../../utils/mixins/ActionMixin'),
  BikeshedBuilderStore = require('../stores/BikeshedBuilderStore'),
  BikeshedBuilderActions = require('../actions/BikeshedBuilderActions')

var Home = React.createClass({
  mixins: [ActionMixin, PureRenderMixin],

  render () {
    var {bikes, preview, form} = this.props
    return (
      <div className='home'>
        <BikeshedBuilder
          onFormChange={this._onFormChange}
          onBikeClear={this._onBikeClear}
          onBikeClick={this._onBikeClick}
          addFiles={this._addFiles}
          onSubmit={this._onSubmit}
          bikes={bikes}
          form={form}/>
        <BikePreview
          closePreview={this._closePreview}
          preview={preview}
          bikes={bikes}/>
      </div>
    )
  },

  _addFiles (files) {
    this.executeAction(BikeshedBuilderActions.addFiles, files)
  },

  _onSubmit () {
    this.executeAction(BikeshedBuilderActions.saveBikeshed)
  },

  _onBikeClick (name) {
    this.executeAction(BikeshedBuilderActions.openPreview, name)
  },

  _closePreview () {
    this.executeAction(BikeshedBuilderActions.closePreview)
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
