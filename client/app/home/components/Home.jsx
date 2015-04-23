var React = require('react/addons'),
  PureRenderMixin = React.addons.PureRenderMixin,
  {connectToStores} = require('fluxible/addons'),
  BikeshedBuilder = require('./BikeshedBuilder'),
  ActionMixin = require('../../../utils/mixins/ActionMixin'),
  BikeshedBuilderStore = require('../stores/BikeshedBuilderStore'),
  BikeshedBuilderActions = require('../actions/BikeshedBuilderActions')

var Home = React.createClass({
  mixins: [ActionMixin, PureRenderMixin],

  render () {
    var {bikes, form} = this.props
    var builderProps = {
      onFormChange: this._onFormChange,
      onBikeClear: this._onBikeClear,
      addFiles: this._addFiles,
      bikes,
      form
    }
    return (
      <div className='home'>
        <BikeshedBuilder {...builderProps}/>
      </div>
    )
  },

  _addFiles (files) {
    this.executeAction(BikeshedBuilderActions.addFiles, files)
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
