var React = require('react'),
  {RouteHandler} = require('react-router'),
  FluxibleRouterMixin = require('../../utils/FluxibleRouterMixin')

var ApplicationStore = require('../../stores/ApplicationStore')

var Navbar = require('./Navbar.jsx'),
  Sidebar = require('./Sidebar.jsx')

var Application = React.createClass({
  mixins: [FluxibleRouterMixin],
  statics: {
    storeListeners: [ApplicationStore]
  },

  getInitialState: function () {
    return this.getStore(ApplicationStore).getState()
  },

  onChange: function () {
    this.setState(this.getStore(ApplicationStore).getState())
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
    )
  }
})

module.exports = Application