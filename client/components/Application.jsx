var React = require('react'),
  {RouteHandler} = require('react-router'),
  StoreMixin = require('fluxible').StoreMixin;

var ApplicationStore = require('../stores/ApplicationStore');

var Application = React.createClass({
  mixins: [StoreMixin],
  statics: {
    storeListeners: [ApplicationStore]
  },

  getInitialState: function () {
    return this.getStore(ApplicationStore).getState();
  },

  onChange: function () {
    var state = this.getStore(ApplicationStore).getState();
    this.setState(state);
  },

  render: function () {
    return <RouteHandler {...this.props}/>;
  }
});

module.exports = Application;
