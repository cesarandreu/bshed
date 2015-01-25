var React = require('react'),
  {RouteHandler} = require('react-router'),
  StoreMixin = require('fluxible').StoreMixin;

var ApplicationStore = require('../stores/ApplicationStore');

var Layout = require('./Layout.jsx'),
  Navbar = require('./Navbar.jsx'),
  Navigation = require('./Navigation.jsx');

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
    var {context} = this.props;

    return (
      <Layout context={context}>
        <Navigation context={context}/>
        <Navbar context={context}/>
        <RouteHandler/>
      </Layout>
    );
  }
});

module.exports = Application;
