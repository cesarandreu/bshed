require('./home.less')

const React = require('react/addons')
const BikePreview = require('./BikePreview')
const PureRenderMixin = React.addons.PureRenderMixin
const {connectToStores} = require('fluxible/addons')
const BikeshedBuilder = require('./BikeshedBuilder')
const BikeshedBuilderStore = require('../../stores/BikeshedBuilderStore')
const BikeshedBuilderActions = require('../../actions/BikeshedBuilderActions')

const Home = React.createClass({
  mixins: [
    PureRenderMixin
  ],

  statics: {
    navigateAction: BikeshedBuilderActions.builderNavigateAction
  },

  render () {
    const {state, preview} = this.props
    return (
      <div className='home'>
        <BikeshedBuilder
          bikes={state.get('bikes')}
          form={state.get('form')}
        />
        <BikePreview
          preview={preview}
        />
      </div>
    )
  }
})

module.exports = connectToStores(Home, [BikeshedBuilderStore], stores => {
  return {
    preview: stores.BikeshedBuilderStore.getPreviewState(),
    state: stores.BikeshedBuilderStore.getState()
  }
})