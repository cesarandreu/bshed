var React = require('react'),
  BikeshedList = require('./BikeshedList'),
  StoreMixin = require('../../../utils/mixins/StoreMixin'),
  BikeshedListStore = require('../stores/BikeshedListStore')

var BikeshedListContainer = React.createClass({
  mixins: [StoreMixin],
  statics: {
    storeListeners: [BikeshedListStore],
    navigationData: function ({params, query, pathname}={}) {
      var {storeName} = BikeshedListStore
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
