const React = require('react')
const Immutable = require('immutable')
const BikeGrid = require('../BikeGrid')
const BikeshedInfo = require('../BikeshedInfo')
const {connectToStores} = require('fluxible/addons')
const BikePreview = require('../../shared/BikePreview')
const ActionMixin = require('../../../lib/ActionMixin')
const RegularPage = require('../../general/RegularPage')
const BikeshedStore = require('../../../stores/BikeshedStore')
const BikeshedActions = require('../../../actions/BikeshedActions')
const ImmutableRenderMixin = require('react-immutable-render-mixin')

var BikeshedInfoWrapper = React.createClass({
  mixins: [
    ActionMixin,
    ImmutableRenderMixin
  ],

  propTypes: {
    bikeshed: React.PropTypes.instanceOf(Immutable.Map).isRequired,
    bikes: React.PropTypes.instanceOf(Immutable.List).isRequired,
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

        <BikePreview
          name={preview}
          url={preview && `http://localhost:10001/bshed/${bikeshed.get('id')}/${preview}`}
          onPrevious={this._previousPreview}
          onClose={this._closePreview}
          onNext={this._nextPreview}
        />
      </RegularPage>
    )
  },

  _nextPreview () {
    this.executeAction(BikeshedActions.nextPreview)
  },

  _previousPreview () {
    this.executeAction(BikeshedActions.previousPreview)
  },

  _closePreview () {
    this.executeAction(BikeshedActions.preview, '')
  }
})

BikeshedInfoWrapper = connectToStores(BikeshedInfoWrapper, [BikeshedStore], stores => {
  const {bikeshed, user, bikes} = stores.BikeshedStore.getCurrent()
  const preview = stores.BikeshedStore.getPreview()
  return {
    bikeshed,
    preview,
    bikes,
    user
  }
})

module.exports = BikeshedInfoWrapper
