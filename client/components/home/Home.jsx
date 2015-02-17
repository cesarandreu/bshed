var React = require('react'),
  {FluxibleMixin} = require('fluxible'),
  BikeshedBuilder = require('./BikeshedBuilder.jsx'),
  BikeshedBuilderStore = require('../../stores/BikeshedBuilderStore');

var Home = React.createClass({
  mixins: [FluxibleMixin],
  statics: {
    storeListeners: [BikeshedBuilderStore]
  },
  getInitialState: function () {
    return this.getStore(BikeshedBuilderStore).getState();
  },

  onChange: function () {
    this.setState(this.getStore(BikeshedBuilderStore).getState());
  },
  render: function () {
    return <BikeshedBuilder {...this.state}/>
  }
});

module.exports = Home;
