const React = require('react/addons')
const PureRenderMixin = React.addons.PureRenderMixin
const {connectToStores} = require('fluxible/addons')
const BikeshedStore = require('../../stores/BikeshedStore')
const BikeshedActions = require('../../actions/BikeshedActions')

const BikeshedInfo = React.createClass({
  mixins: [
    PureRenderMixin
  ],

  statics: {
    navigateAction: BikeshedActions.infoNavigateAction
  },

  propTypes: {
    bikeshed: React.PropTypes.object.isRequired
  },

  render () {
    return (
      <div>
        BIKESHED INFO
      </div>
    )
  }
})

module.exports = connectToStores(BikeshedInfo, [BikeshedStore], stores => {
  return {
    bikeshed: stores.BikeshedStore.getCurrent()
  }
})
