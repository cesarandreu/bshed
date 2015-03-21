var React = require('react'),
  FluxibleRouterMixin = require('../../utils/FluxibleRouterMixin'),
  BikeshedBuilderHero = require('./BikeshedBuilderHero.jsx'),
  BikeGrid = require('./BikeGrid.jsx'),
  AddBikeButton = require('./AddBikeButton.jsx'),
  BikeshedBuilderAction = require('../../actions/BikeshedBuilder'),
  BikeshedBuilderStore = require('../../stores/BikeshedBuilderStore')

var Home = React.createClass({
  mixins: [FluxibleRouterMixin],
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
        <BikeGrid bikes={bikes}/>
        <AddBikeButton inputChange={this._inputChange}/>
      </div>
    )
  },

  _inputChange (e) {
    this.executeAction(BikeshedBuilderAction.addFiles, e.target.files)
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
