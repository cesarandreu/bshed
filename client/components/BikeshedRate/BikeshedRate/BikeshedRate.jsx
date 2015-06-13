require('./BikeshedRate.less')

const React = require('react')
const Immutable = require('immutable')
const {connectToStores} = require('fluxible/addons')
const RegularPage = require('../../general/RegularPage')
const ActionMixin = require('../../../lib/ActionMixin')
const BikeshedStore = require('../../../stores/BikeshedStore')
const BikeshedActions = require('../../../actions/BikeshedActions')
const ImmutableRenderMixin = require('react-immutable-render-mixin')
const BikeshedRateStore = require('../../../stores/BikeshedRateStore')

var BikeshedRate = React.createClass({
  mixins: [
    ActionMixin,
    ImmutableRenderMixin
  ],

  statics: {
    navigateAction: BikeshedActions.rateNavigateAction
  },

  propTypes: {
    ratings: React.PropTypes.instanceOf(Immutable.List).isRequired,
    bikes: React.PropTypes.instanceOf(Immutable.List).isRequired,
    bikeshed: React.PropTypes.instanceOf(Immutable.Map).isRequired,
    user: React.PropTypes.instanceOf(Immutable.Map).isRequired,
    preview: React.PropTypes.string.isRequired
  },

  render () {
    return (
      <RegularPage>
        THIS IS BIKESHED RATE
      </RegularPage>
    )
  }
})

BikeshedRate = connectToStores(BikeshedRate, [
    BikeshedRateStore,
    BikeshedStore
  ], stores => {
    const {ratings, bikes} = stores.BikeshedRateStore.getCurrent()
    const {bikeshed, user} = stores.BikeshedStore.getCurrent()
    const preview = stores.BikeshedRateStore.getPreview()
    return {
      bikeshed,
      ratings,
      preview,
      bikes,
      user
    }
  })

module.exports = BikeshedRate
