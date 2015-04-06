var React = require('react'),
  IconButton = require('../../components/buttons/IconButton.jsx'),
  ActionMixin = require('../../utils/mixins/ActionMixin'),
  LayoutAction = require('../../actions/Layout'),
  {Link} = require('react-router')

var Navbar = React.createClass({
  mixins: [ActionMixin],
  toggleMenu: function () {
    this.executeAction(LayoutAction.sidebar.toggle)
  },

  render: function () {
    return (
      <nav className='navbar'>
        <IconButton className='navbar-menu-button' icon='md-menu' onClick={this.toggleMenu}/>
        <div className='navbar-inner'>
          <Link className='navbar-title' to='home'>Bikeshed it!</Link>
        </div>
      </nav>
    )
  }
})

module.exports = Navbar
