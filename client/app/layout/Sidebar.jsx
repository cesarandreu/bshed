var React = require('react/addons'),
  LayoutAction = require('../../actions/Layout'),
  LayoutStore = require('../../stores/LayoutStore'),
  {Link} = require('react-router'),
  {FluxibleMixin} = require('fluxible')

var Sidebar = React.createClass({
  mixins: [FluxibleMixin],
  statics: {
    storeListeners: [LayoutStore]
  },

  getInitialState: function () {
    return this.getStore(LayoutStore).getState()
  },

  onChange: function () {
    var state = this.getStore(LayoutStore).getState()
    this.setState(state)
  },

  _closeMenu: function () {
    this.executeAction(LayoutAction.closeMenu)
  },

  _checkState: function (event) {
    if (event.currentTarget.classList.contains('active'))
      event.preventDefault()
  },

  render: function () {
    var links = [{
      path: '/',
      text: 'Home'
    }, {
      path: '/bikesheds',
      text: 'Bikesheds'
    }, {
      path: '/about',
      text: 'About'
    }].map((link, idx) =>
      <Link key={idx} onClick={this._checkState} to={link.path}>{link.text}</Link>
    )

    return (
      <div className={`sidebar-container ${this.state.openMenu ? 'open' : 'closed'}`}>
        <nav className='sidebar'>
          <div className='sidebar-section'>{links}</div>
        </nav>
        <div className='sidebar-overlay' onClick={this._closeMenu}></div>
      </div>
    )
  }
})

module.exports = Sidebar
