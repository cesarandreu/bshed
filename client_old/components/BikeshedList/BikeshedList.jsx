import React from 'react'
const {connectToStores} = require('fluxible/addons')
const BikeshedStore = require('../../stores/BikeshedStore')
const BikeshedActions = require('../../actions/BikeshedActions')
import ImmutableRenderMixin from 'react-immutable-render-mixin'

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
