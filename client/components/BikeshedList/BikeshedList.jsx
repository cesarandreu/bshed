const React = require('react/addons')
const PureRenderMixin = React.addons.PureRenderMixin
const {connectToStores} = require('fluxible/addons')
const BikeshedStore = require('../../stores/BikeshedStore')
const BikeshedActions = require('../../actions/BikeshedActions')

const BikeshedList = React.createClass({
  mixins: [
    PureRenderMixin
  ],

  statics: {
    navigateAction: BikeshedActions.listNavigateAction
  },

  render () {
    return (
      <div>
        BIKESHED LIST
      </div>
    )
  }
})

module.exports = connectToStores(BikeshedList, [BikeshedStore], stores => {
  return {
    bikeshed: stores.BikeshedStore.getCurrentList()
  }
})
