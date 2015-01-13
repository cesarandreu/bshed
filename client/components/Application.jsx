'use strict';

var React = require('react'),
  Layout = require('./Layout.jsx'),
  ApplicationStore = require('../stores/ApplicationStore'),
  RouterMixin = require('flux-router-component').RouterMixin,
  StoreMixin = require('fluxible').StoreMixin;

var Application = React.createClass({
  displayName: 'Application',
  mixins: [RouterMixin, StoreMixin],
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
    return <div></div>;
  },

  componentDidUpdate: function (prevPops, prevState) {
    if (this.state.pageTitle !== prevState.pageTitle)
      document.title = this.state.pageTitle;
  }
});

module.exports = Application;
