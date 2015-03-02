var React = require('react'),
  LayoutAction = require('../../actions/Layout'),
  NavbarUser = require('./NavbarUser.jsx'),
  {FluxibleMixin} = require('fluxible'),
  {Link} = require('react-router')

var Navbar = React.createClass({
  mixins: [FluxibleMixin],
  toggleMenu: function () {
    this.executeAction(LayoutAction.toggleMenu)
  },

  render: function () {
    return (
      <nav className='navbar'>
        <div className='navbar-inner'>
          <Link className='navbar-title' to='home'>Bikeshed it!</Link>
          <NavbarUser/>
        </div>
      </nav>
    )
  }
})

module.exports = Navbar
