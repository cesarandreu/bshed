const React = require('react/addons')
const Immutable = require('immutable')
const BikePreview = require('../shared/BikePreview')
const {connectToStores} = require('fluxible/addons')
const BikeshedBuilder = require('./BikeshedBuilder')
const ActionMixin = require('../../lib/ActionMixin')
const RegularPage = require('../general/RegularPage')
const ImmutableRenderMixin = require('react-immutable-render-mixin')
const BikeshedBuilderStore = require('../../stores/BikeshedBuilderStore')
const BikeshedBuilderActions = require('../../actions/BikeshedBuilderActions')

var Home = React.createClass({
  mixins: [
    ActionMixin,
    ImmutableRenderMixin
  ],

  statics: {
    navigateAction: BikeshedBuilderActions.builderNavigateAction
  },

  propTypes: {
    preview: React.PropTypes.string.isRequired,
    form: React.PropTypes.instanceOf(Immutable.Map).isRequired,
    bikes: React.PropTypes.instanceOf(Immutable.OrderedMap).isRequired
  },

  render () {
    const {form, bikes, preview} = this.props
    return (
      <RegularPage>
        <BikeshedBuilder
          bikes={bikes}
          form={form}
        />
        <BikePreview
          name={preview}
          url={bikes.getIn([preview, 'url'], '')}
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
    preview: stores.BikeshedBuilderStore.getPreview(),
    bikes: stores.BikeshedBuilderStore.getBikes(),
    form: stores.BikeshedBuilderStore.getForm()
  }
})

module.exports = Home
