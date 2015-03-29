var React = require('react/addons'),
  BikeGrid = require('./BikeGrid.jsx'),
  AddBikeButton = require('./AddBikeButton.jsx'),
  PureRenderMixin = React.addons.PureRenderMixin,
  StoreMixin = require('../../utils/mixins/StoreMixin'),
  ActionMixin = require('../../utils/mixins/ActionMixin'),
  BikeshedBuilderHero = require('./BikeshedBuilderHero.jsx'),
  BikeshedBuilderAction = require('../../actions/BikeshedBuilder'),
  BikeshedBuilderStore = require('../../stores/BikeshedBuilderStore')

var Home = React.createClass({
  mixins: [ActionMixin, PureRenderMixin, StoreMixin],
  statics: {
    storeListeners: [BikeshedBuilderStore]
  },
  getInitialState () {
    return this.getStore(BikeshedBuilderStore).getState()
  },
  onChange () {
    this.setState(this.getStore(BikeshedBuilderStore).getState())
  },
  render () {
    var {bikes} = this.state

    return (
      <div className='bikeshed-builder'>
        {!bikes.length && <BikeshedBuilderHero/>}
        <BikeGrid bikes={bikes} onBikeClick={this._onBikeClick}/>
        <AddBikeButton inputChange={this._inputChange}/>
      </div>
    )
  },

  _inputChange (e) {
    this.executeAction(BikeshedBuilderAction.addFiles, e.target.files)
  },

  _onBikeClick (bikeName) {
    this.executeAction(BikeshedBuilderAction.removeBike, bikeName)
  }

})

module.exports = Home

/*

bottom text area is 48px
text padding 16px
grid padding 4px or 1px

card height is 148px
card width is 180px

*/
