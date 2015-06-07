const React = require('react/addons')
const Immutable = require('immutable')
const BikePreview = require('../shared/BikePreview')
const PureRenderMixin = React.addons.PureRenderMixin
const {connectToStores} = require('fluxible/addons')
const BikeshedBuilder = require('./BikeshedBuilder')
const ActionMixin = require('../../lib/ActionMixin')
const RegularPage = require('../general/RegularPage')
const BikeshedBuilderStore = require('../../stores/BikeshedBuilderStore')
const BikeshedBuilderActions = require('../../actions/BikeshedBuilderActions')

var Home = React.createClass({
  mixins: [
    ActionMixin,
    PureRenderMixin
  ],

  statics: {
    navigateAction: BikeshedBuilderActions.builderNavigateAction
  },

  propTypes: {
    preview: React.PropTypes.instanceOf(Immutable.Map).isRequired,
    state: React.PropTypes.instanceOf(Immutable.Map).isRequired
  },

  render () {
    const {state, preview} = this.props
    return (
      <RegularPage>
        <BikeshedBuilder
          bikes={state.get('bikes')}
          form={state.get('form')}
        />
        <BikePreview
          preview={preview}
          onClose={this._closePreview}
        />
      </RegularPage>
    )
  },

  _closePreview () {
    this.executeAction(BikeshedBuilderActions.preview, '')
  }
})

Home = connectToStores(Home, [BikeshedBuilderStore], stores => {
  return {
    preview: stores.BikeshedBuilderStore.getPreviewState(),
    state: stores.BikeshedBuilderStore.getState()
  }
})

module.exports = Home
