require('./BikeshedRate.less')

const React = require('react')
const Immutable = require('immutable')
const {connectToStores} = require('fluxible/addons')
const RegularPage = require('../../general/RegularPage')
const ActionMixin = require('../../../lib/ActionMixin')
const BikeshedStore = require('../../../stores/BikeshedStore')
const ImmutableRenderMixin = require('react-immutable-render-mixin')
const BikeshedRateStore = require('../../../stores/BikeshedRateStore')
// const BikeshedActions = require('../../../actions/BikeshedActions')

var BikeshedRate = React.createClass({
  mixins: [
    ActionMixin,
    ImmutableRenderMixin
  ],

  propTypes: {
    votes: React.PropTypes.instanceOf(Immutable.Map).isRequired,
    bikes: React.PropTypes.instanceOf(Immutable.OrderedMap).isRequired,
    bikeshed: React.PropTypes.instanceOf(Immutable.Map).isRequired,
    user: React.PropTypes.instanceOf(Immutable.Map).isRequired,
    preview: React.PropTypes.string.isRequired
  },

  render () {
    return (
      <RegularPage>
        THIS IS BIKESHED VOTE
      </RegularPage>
    )
  }
})

BikeshedRate = connectToStores(BikeshedRate, [
    BikeshedRateStore,
    BikeshedStore
  ], stores => {
    const {bikeshed, user, bikes} = stores.BikeshedStore.getCurrent()
    const ratings = stores.BikeshedRateStore.getRatings(bikes)
    return {
      bikeshed,
      ratings,
      bikes,
      user
    }
  })

module.exports = BikeshedRate
