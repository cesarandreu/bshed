require('./Navbar.less')

const React = require('react/addons')
const {Link} = require('react-router')
const Immutable = require('immutable')
const {connectToStores} = require('fluxible/addons')
const ActionMixin = require('../../../lib/ActionMixin')
const NavbarStore = require('../../../stores/NavbarStore')
const IconButton = require('../../general/Buttons/IconButton')
const SidebarActions = require('../../../actions/SidebarActions')

var Navbar = React.createClass({
  mixins: [
    ActionMixin
  ],

  propTypes: {
    navbar: React.PropTypes.instanceOf(Immutable.Map).isRequired
  },

  render () {
    const {navbar} = this.props
    return (
      <nav className='navbar'>
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
      </nav>
    )
  },

  _toggleSidebar () {
    this.executeAction(SidebarActions.toggle)
  }
})

Navbar = connectToStores(Navbar, [NavbarStore], stores => {
  return {
    navbar: stores.NavbarStore.getState()
  }
})

module.exports = Navbar
