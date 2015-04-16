var React = require('react/addons'),
  {RouteHandler} = require('react-router'),
  PureRenderMixin = React.addons.PureRenderMixin,
  LayoutStore = require('../stores/LayoutStore'),
  {connectToStores} = require('fluxible/addons'),
  LayoutActions = require('../actions/LayoutActions'),
  ActionMixin = require('../../../utils/mixins/ActionMixin')

var Navbar = require('./Navbar.jsx'),
  Sidebar = require('./Sidebar.jsx')

var Application = React.createClass({
  mixins: [ActionMixin, PureRenderMixin],

  render () {
    var sidebarProps = {
      sidebar: this.props.sidebar,
      closeSidebar: this._closeSidebar
    }
    var navbarProps = {
      navbar: this.props.navbar,
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
    this.executeAction(LayoutActions.sidebar.toggle)
  },

  _closeSidebar () {
    this.executeAction(LayoutActions.sidebar.close)
  }
})

Application = connectToStores(Application, [LayoutStore], stores => {
  return stores.LayoutStore.getState()
})

module.exports = Application
