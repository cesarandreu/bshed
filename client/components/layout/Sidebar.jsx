var React = require('react/addons'),
  LayoutStore = require('../../stores/LayoutStore'),
  LayoutAction = require('../../actions/Layout'),
  {StoreMixin} = require('fluxible'),
  {Link, State: StateMixin} = require('react-router');

var Sidebar = React.createClass({
  mixins: [StoreMixin, StateMixin],
  statics: {
    storeListeners: [LayoutStore]
  },

  getInitialState: function () {
    return this.getStore(LayoutStore).getState();
  },

  onChange: function () {
    var state = this.getStore(LayoutStore).getState();
    this.setState(state);
  },

  _closeMenu: function () {
    this.props.context.executeAction(LayoutAction.closeMenu)
  },

  _closeMenuLink: function (event) {
    event.currentTarget.classList.contains('active') ? event.preventDefault() : this._closeMenu()
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
    }]
    .map((link, idx) =>
      <li key={idx}><Link onClick={this._closeMenuLink} to={link.path}>{link.text}</Link></li>
    );

    return (
      <div className={`sidebar-container ${this.state.openMenu ? 'open' : 'closed'}`}>
        <nav className='sidebar'>
          <ul>{links}</ul>
        </nav>
        <div className='sidebar-overlay' onTouchTap={this._closeMenu}></div>
      </div>
    );
  }
});

module.exports = Sidebar;
