require('./BikeshedRate.less')

import React, { PropTypes } from 'react'
import Immutable from 'immutable'
const { connectToStores } = require('fluxible/addons')
const RegularPage = require('../../general/RegularPage')
const ActionMixin = require('../../../lib/ActionMixin')
const BikeshedStore = require('../../../stores/BikeshedStore')
const BikeshedActions = require('../../../actions/BikeshedActions')
import ImmutableRenderMixin from 'react-immutable-render-mixin'
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
    ratings: PropTypes.instanceOf(Immutable.List).isRequired,
    bikes: PropTypes.instanceOf(Immutable.List).isRequired,
    bikeshed: PropTypes.instanceOf(Immutable.Map).isRequired,
    user: PropTypes.instanceOf(Immutable.Map).isRequired,
    preview: PropTypes.string.isRequired
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
