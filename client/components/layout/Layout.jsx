var React = require('react'),
  {RouteHandler} = require('react-router'),
  LayoutStore = require('../../stores/LayoutStore'),
  StoreMixin = require('fluxible').StoreMixin;

var Navbar = require('./Navbar.jsx'),
  Sidebar = require('./Sidebar.jsx');

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
    return (
      <div className='layout'>
        <Sidebar {...this.props}/>
        <Navbar {...this.props}/>
        <div className='content'>
          <RouteHandler {...this.props}/>
        </div>
      </div>
    );
  }
});

module.exports = Layout;
