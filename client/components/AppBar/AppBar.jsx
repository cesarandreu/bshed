import './AppBar.less'

import React from 'react'
import { Link } from 'react-router'
import BaseButton from '../common/BaseButton'
import ActionMixin from '../../lib/ActionMixin'
import * as SidebarActions from '../../actions/SidebarActions'

export const AppBarMenuButton = React.createClass({
  mixins: [
    ActionMixin
  ],

  shouldComponentUpdate () {
    return false
  },

  render () {
    return (
      <BaseButton
        onClick={() => this.executeAction(SidebarActions.toggle)}
        className='app-bar-menu-button'
      >
        <img
          src={require('./ic_menu_white_24px.svg')}
          className='app-bar-menu-button-icon'
        />
      </BaseButton>
    )
  }
})

export const AppBarTitle = React.createClass({
  shouldComponentUpdate () {
    return false
  },

  render () {
    return (
      <Link to='home' className='app-bar-title'>
        Bikeshed it!
      </Link>
    )
  }
})

export const AppBar = React.createClass({
  shouldComponentUpdate () {
    return false
  },

  render () {
    return (
      <div className='app-bar-placeholder'>
        <nav className='app-bar'>
          <AppBarMenuButton/>
          <AppBarTitle/>
        </nav>
      </div>
    )
  }
})

export default AppBar
