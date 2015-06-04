require('./bikeshed.less')

const React = require('react/addons')
const Immutable = require('immutable')
const BikeGrid = require('./BikeGrid')
const BikeshedInfo = require('./BikeshedInfo')
const PureRenderMixin = React.addons.PureRenderMixin
const BikePreview = require('../shared/BikePreview')
const ActionMixin = require('../../lib/ActionMixin')
const {connectToStores} = require('fluxible/addons')
const RateBikesButton = require('./RateBikesButton')
const BikeshedStore = require('../../stores/BikeshedStore')
const BikeshedActions = require('../../actions/BikeshedActions')

const Bikeshed = React.createClass({
  mixins: [
    ActionMixin,
    PureRenderMixin
  ],

  statics: {
    navigateAction: BikeshedActions.infoNavigateAction
  },

  propTypes: {
    bikeshed: React.PropTypes.instanceOf(Immutable.Map).isRequired,
    bikes: React.PropTypes.instanceOf(Immutable.Map).isRequired,
    user: React.PropTypes.instanceOf(Immutable.Map).isRequired,
    preview: React.PropTypes.instanceOf(Immutable.Map)
  },

  render () {
    const {bikeshed, preview, bikes, user} = this.props
    return (
      <div className='bikeshed'>
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
          onClose={this._closePreview}
          preview={preview}
        />
      </div>
    )
  },

  _closePreview () {
    this.executeAction(BikeshedActions.preview, '')
  }
})

module.exports = connectToStores(Bikeshed, [BikeshedStore], stores => {
  const {bikeshed, user, bikes} = stores.BikeshedStore.getCurrent()
  const preview = stores.BikeshedStore.getPreview()

  return {
    bikeshed,
    preview,
    bikes,
    user
  }
})
