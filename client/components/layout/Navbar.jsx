var React = require('react'),
  IconButton = require('../general/IconButton.jsx'),
  LayoutAction = require('../../actions/Layout'),
  NavbarUser = require('./NavbarUser.jsx'),
  {Link} = require('react-router');

var Navbar = React.createClass({

  toggleMenu: function () {
    this.props.context.executeAction(LayoutAction.toggleMenu);
  },

  render: function () {
    return (
      <nav className='navbar'>
        <IconButton icon='md-menu' className='navbar-menu' onTouchTap={this.toggleMenu}/>
        <div className='navbar-inner'>
          <Link className='navbar-title' to='home'>Bikeshed it!</Link>
          <NavbarUser/>
        </div>
      </nav>
    );
  }
});

module.exports = Navbar;
