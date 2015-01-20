'use strict';

var React = require('react/addons'),
  LayoutStore = require('../stores/LayoutStore'),
  StoreMixin = require('fluxible').StoreMixin,
  cx = React.addons.classSet;

var Navigation = React.createClass({
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

    var className = cx({
      closed: !this.state.openMenu
    });

    return (
      <nav className={className}></nav>
    );
  }
});

module.exports = Navigation;
