var React = require('react'),
  {FluxibleMixin} = require('fluxible'),
  {State: StateMixin} = require('react-router'),
  BikeshedList = require('./BikeshedList.jsx'),
  BikeshedListStore = require('../../stores/BikeshedListStore'),
  {storeName} = BikeshedListStore

var BikeshedListContainer = React.createClass({
  mixins: [FluxibleMixin, StateMixin],
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
