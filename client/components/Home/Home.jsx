// TODO: Rename to BikeshedBuilder
import React from 'react'
import Immutable from 'immutable'
const BikePreview = require('../shared/BikePreview')
const {connectToStores} = require('fluxible/addons')
const BikeshedBuilder = require('./BikeshedBuilder')
const ActionMixin = require('../../lib/ActionMixin')
const RegularPage = require('../general/RegularPage')
import ImmutableRenderMixin from 'react-immutable-render-mixin'
const BikeshedBuilderStore = require('../../stores/BikeshedBuilderStore')
const BikeshedBuilderActions = require('../../actions/BikeshedBuilderActions')

var Home = React.createClass({
  mixins: [
    ActionMixin,
    ImmutableRenderMixin
  ],

  statics: {
    navigateAction: BikeshedBuilderActions.builderNavigateAction
  },

  propTypes: {
    preview: React.PropTypes.string.isRequired,
    form: React.PropTypes.instanceOf(Immutable.Map).isRequired
  },

  render () {
    const {form, preview} = this.props
    return (
      <RegularPage>
        <BikeshedBuilder
          form={form}
        />
        <BikePreview
          name={preview}
          onClose={this._closePreview}
          url={form.getIn(['images', preview, 'url'])}
        />
      </RegularPage>
    )
  },

  _closePreview () {
    this.executeAction(BikeshedBuilderActions.preview, '')
  }
})

Home = connectToStores(Home, [BikeshedBuilderStore], stores => {
  return {
    preview: stores.BikeshedBuilderStore.getPreview(),
    form: stores.BikeshedBuilderStore.getForm()
  }
})

module.exports = Home
