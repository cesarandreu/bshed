import './AppBar.less'

import React, { PropTypes } from 'react'
// import { Link } from 'react-router'
// import Immutable from 'immutable'
// const {connectToStores} = require('fluxible/addons')
// const ActionMixin = require('../../../lib/ActionMixin')
// const NavbarStore = require('../../../stores/NavbarStore')
// const IconButton = require('../../general/Buttons/IconButton')
// const SidebarActions = require('../../../actions/SidebarActions')
import ImmutableRenderMixin from 'react-immutable-render-mixin'

const AppBar = React.createClass({
  mixins: [
    // ActionMixin,
    ImmutableRenderMixin
  ],

  propTypes: {
    // navbar: PropTypes.instanceOf(Immutable.Map).isRequired
  },

  render () {
    const { appbar } = this.props
    return (
      <nav className='appbar'>
        {/*
        <IconButton
          className='navbar-menu-button'
          onClick={this._toggleSidebar}
          icon='md-menu'
        />
        */}
        <div className='appbar-inner'>
        {/*
          <Link
            className='navbar-title'
            to={navbar.get('to')}
          >
            {navbar.get('title')}
          </Link>
          */}
        </div>
      </nav>
    )
  }

  // _toggleSidebar () {
  //   this.executeAction(SidebarActions.toggle)
  // }
})

// Navbar = connectToStores(Navbar, [NavbarStore], stores => {
//   return {
//     navbar: stores.NavbarStore.getState()
//   }
// })

module.exports = AppBar