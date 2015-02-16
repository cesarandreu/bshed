var React = require('react'),
  {RouteHandler} = require('react-router'),
  {FluxibleMixin} = require('fluxible');

var ApplicationStore = require('../../stores/ApplicationStore');

var Navbar = require('./Navbar.jsx'),
  Sidebar = require('./Sidebar.jsx');

var Application = React.createClass({
  mixins: [FluxibleMixin],
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
    return (
      <div className='layout'>
        <Navbar/>
        <Sidebar/>
        <div className='content'>
          <RouteHandler/>
        </div>
      </div>
    );
  }
});

module.exports = Application;
