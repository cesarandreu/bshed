var React = require('react'),
  IconButton = require('../../components/buttons/IconButton.jsx'),
  LayoutAction = require('../../actions/Layout'),
  NavbarUser = require('./NavbarUser.jsx'),
  {Link} = require('react-router')

var Navbar = React.createClass({
  contextTypes: {
    executeAction: React.PropTypes.func.isRequired
  },

  toggleMenu: function () {
    this.context.executeAction(LayoutAction.toggleMenu)
  },

  render: function () {
    return (
      <nav className='navbar'>
        <IconButton className='navbar-menu-button' icon='md-menu' onClick={this.toggleMenu}/>
        <div className='navbar-inner'>
          <Link className='navbar-title' to='home'>Bikeshed it!</Link>
          <NavbarUser/>
        </div>
      </nav>
    )
  }
})

module.exports = Navbar
