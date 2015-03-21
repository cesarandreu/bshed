var React = require('react'),
  FluxibleRouterMixin = require('../../utils/FluxibleRouterMixin'),
  BikeshedListStore = require('../../stores/BikeshedListStore'),
  BikeshedList = require('./BikeshedList.jsx'),
  {storeName} = BikeshedListStore

var BikeshedListContainer = React.createClass({
  mixins: [FluxibleRouterMixin],
  statics: {
    storeListeners: [BikeshedListStore],
    navigationData: function ({params, query, pathname}={}) {
      return {storeName, params, query, pathname}
    }
  },

  getInitialState: function () {
    return this.getStore(BikeshedListStore).getState()
  },

  onChange: function () {
    var state = this.getStore(BikeshedListStore).getState()
    this.setState(state)
  },

  render: function () {
    return <BikeshedList {...this.state}/>
  }
})

module.exports = BikeshedListContainer
