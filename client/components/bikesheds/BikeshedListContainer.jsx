var React = require('react'),
  {Mixin: FluxibleMixin} = require('fluxible'),
  {State: StateMixin} = require('react-router'),
  BikeshedList = require('./BikeshedList.jsx'),
  BikeshedListStore = require('../../stores/BikeshedListStore'),
  {storeName} = BikeshedListStore;

var BikeshedListContainer = React.createClass({
  mixins: [FluxibleMixin, StateMixin],
  statics: {
    storeListeners: [BikeshedListStore],
    fetchData: function ({params, query}={}) {
      return {storeName, params, query};
    }
  },

  getInitialState: function () {
    return this.getStore(BikeshedListStore).getState();
  },

  onChange: function () {
    var state = this.getStore(BikeshedListStore).getState();
    this.setState(state);
  },

  render: function () {
    return <BikeshedList/>
  }
});

module.exports = BikeshedListContainer;
