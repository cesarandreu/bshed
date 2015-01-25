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
    // var className = `layout ${this.state.currentLayout}`;
    var className = 'layout';

    return <div className={className}>{this.props.children}</div>;
  }
});

module.exports = Layout;
