const React = require('react/addons')
const Immutable = require('immutable')
const BikeGrid = require('../BikeGrid')
const BikeshedInfo = require('../BikeshedInfo')
const PureRenderMixin = React.addons.PureRenderMixin
const {connectToStores} = require('fluxible/addons')
const RateBikesButton = require('../RateBikesButton')
const BikePreview = require('../../shared/BikePreview')
const ActionMixin = require('../../../lib/ActionMixin')
const RegularPage = require('../../general/RegularPage')
const BikeshedStore = require('../../../stores/BikeshedStore')
const BikeshedActions = require('../../../actions/BikeshedActions')

var Bikeshed = React.createClass({
  mixins: [
    ActionMixin,
    PureRenderMixin
  ],

  statics: {
    navigateAction: BikeshedActions.infoNavigateAction
  },

  propTypes: {
    bikes: React.PropTypes.instanceOf(Immutable.OrderedMap).isRequired,
    bikeshed: React.PropTypes.instanceOf(Immutable.Map).isRequired,
    user: React.PropTypes.instanceOf(Immutable.Map).isRequired,
    preview: React.PropTypes.string.isRequired
  },

  render () {
    const {bikeshed, preview, bikes, user} = this.props
    return (
      <RegularPage>
        <BikeshedInfo
          bikeshed={bikeshed}
          user={user}
        />

        <BikeGrid
          bikeshed={bikeshed}
          bikes={bikes}
        />

        <RateBikesButton/>

        <BikePreview
          name={preview}
          url={bikes.getIn([preview, 'url'], '')}
          onClose={this._closePreview}
        />
      </RegularPage>
    )
  },

  _closePreview () {
    this.executeAction(BikeshedActions.preview, '')
  }
})

Bikeshed = connectToStores(Bikeshed, [BikeshedStore], stores => {
  const {bikeshed, user, bikes} = stores.BikeshedStore.getCurrent()
  const preview = stores.BikeshedStore.getPreview()
  return {
    bikeshed,
    preview,
    bikes,
    user
  }
})

module.exports = Bikeshed
