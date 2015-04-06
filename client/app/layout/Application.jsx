var React = require('react/addons'),
  {RouteHandler} = require('react-router'),
  LayoutAction = require('../../actions/Layout'),
  PureRenderMixin = React.addons.PureRenderMixin,
  LayoutStore = require('../../stores/LayoutStore'),
  StoreMixin = require('../../utils/mixins/StoreMixin'),
  ActionMixin = require('../../utils/mixins/ActionMixin')

var Navbar = require('./Navbar.jsx'),
  Sidebar = require('./Sidebar.jsx')

var Application = React.createClass({
  mixins: [ActionMixin, PureRenderMixin, StoreMixin],

  statics: {
    storeListeners: [LayoutStore]
  },

  getInitialState () {
    return this.getStore(LayoutStore).getState()
  },

  onChange () {
    this.setState(this.getInitialState())
  },

  render () {
    var sidebarProps = {
      sidebar: this.state.sidebar,
      closeSidebar: this._closeSidebar
    }
    var navbarProps = {
      navbar: this.state.navbar,
      toggleSidebar: this._toggleSidebar
    }

    return (
      <div className='layout'>
        <Navbar {...navbarProps}/>
        <Sidebar {...sidebarProps}/>
        <div className='content'>
          <RouteHandler/>
        </div>
      </div>
    )
  },

  _toggleSidebar () {
    this.executeAction(LayoutAction.sidebar.toggle)
  },

  _closeSidebar () {
    this.executeAction(LayoutAction.sidebar.close)
  }
})

module.exports = Application
