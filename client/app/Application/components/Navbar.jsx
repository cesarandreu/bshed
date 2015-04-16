var React = require('react/addons'),
  IconButton = require('../../../components/buttons/IconButton.jsx'),
  PureRenderMixin = React.addons.PureRenderMixin,
  {Link} = require('react-router')

var Navbar = React.createClass({
  mixins: [PureRenderMixin],

  propTypes: {
    navbar: React.PropTypes.object.isRequired,
    toggleSidebar: React.PropTypes.func.isRequired
  },

  render: function () {
    var {toggleSidebar, navbar} = this.props
    navbar = navbar.toJS()

    return (
      <nav className='navbar'>
        <IconButton className='navbar-menu-button' icon='md-menu' onClick={toggleSidebar}/>
        <div className='navbar-inner'>
          <Link className='navbar-title' to={navbar.title.to}>
            {navbar.title.text}
          </Link>
        </div>
      </nav>
    )
  }
})

module.exports = Navbar
