'use strict';

var React = require('react'),
  LayoutStore = require('../stores/LayoutStore'),
  StoreMixin = require('fluxible').StoreMixin;

var Layout = React.createClass({
  mixins: [StoreMixin],
  statics: {
    storeListeners: [LayoutStore]
  },

  getInitialState: function () {
    return this.getStore(LayoutStore).getState();
  },

  onChange: function () {
    var state = this.getStore(LayoutStore).getState();
    this.setState(state);
  },

  render: function () {
    return <div></div>;
  }
});

module.exports = Layout;
