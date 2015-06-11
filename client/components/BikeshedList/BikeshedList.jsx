const React = require('react')
const {connectToStores} = require('fluxible/addons')
const BikeshedStore = require('../../stores/BikeshedStore')
const BikeshedActions = require('../../actions/BikeshedActions')
const ImmutableRenderMixin = require('react-immutable-render-mixin')

const BikeshedList = React.createClass({
  mixins: [
    ImmutableRenderMixin
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
