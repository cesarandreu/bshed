require('./RateBikesButton.less')

const React = require('react/addons')
const PureRenderMixin = React.addons.PureRenderMixin
const ActionMixin = require('../../../lib/ActionMixin')
const BikeshedActions = require('../../../actions/BikeshedActions')
const LabeledActionButton = require('../../general/Buttons/LabeledActionButton')

const RateBikesButton = React.createClass({
  mixins: [
    ActionMixin,
    PureRenderMixin
  ],

  render () {
    return (
      <LabeledActionButton
        className='rate-bikes-button'
        label='Rate bikes'
        icon='md-directions-bike'
        onClick={this._onClick}
      />
    )
  },

  _onClick () {
    // this.executeAction(BikeshedActions)
  }
})

module.exports = RateBikesButton
