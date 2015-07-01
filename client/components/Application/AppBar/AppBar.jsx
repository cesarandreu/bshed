import './AppBar.less'

import React, { PropTypes } from 'react'
// const {Link} = require('react-router')
import Immutable from 'immutable'
// const {connectToStores} = require('fluxible/addons')
// const ActionMixin = require('../../../lib/ActionMixin')
// const NavbarStore = require('../../../stores/NavbarStore')
// const IconButton = require('../../general/Buttons/IconButton')
// const SidebarActions = require('../../../actions/SidebarActions')
// import ImmutableRenderMixin from 'react-immutable-render-mixin'

var AppBar = React.createClass({
  // mixins: [
  //   ActionMixin,
  //   ImmutableRenderMixin
  // ],

  propTypes: {
    appbar: PropTypes.instanceOf(Immutable.Map).isRequired
  },

  render () {
    // const { navbar } = this.props
    return (
      <div className='app-bar-container'>

        <div className='app-bar'>
          APPBAR
        </div>
      {/*
        <IconButton
          className='navbar-menu-button'
          onClick={this._toggleSidebar}
          icon='md-menu'
        />
        <div className='navbar-inner'>
          <Link
            className='navbar-title'
            to={navbar.get('to')}
          >
            {navbar.get('title')}
          </Link>
        </div>
      */}
      </div>
    )
  },

  _toggleSidebar () {
    // this.executeAction(SidebarActions.toggle)
  }
})

// Navbar = connectToStores(Navbar, [NavbarStore], stores => {
//   return {
//     navbar: stores.NavbarStore.getState()
//   }
// })

export default AppBar
