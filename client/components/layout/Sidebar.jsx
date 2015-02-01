var React = require('react/addons'),
  LayoutAction = require('../../actions/Layout'),
  LayoutStore = require('../../stores/LayoutStore'),
  {Link, State: StateMixin} = require('react-router'),
  {StoreMixin} = require('fluxible');

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
    }].map((link, idx) =>
      <Link key={idx} onClick={this._closeMenuLink} to={link.path}>{link.text}</Link>
    );

    return (
      <div className={`sidebar-container ${this.state.openMenu ? 'open' : 'closed'}`}>
        <nav className='sidebar'>
          <div className='sidebar-section'>{links}</div>
        </nav>
        <div className='sidebar-overlay' onTouchTap={this._closeMenu}></div>
      </div>
    );
  }
});

module.exports = Sidebar;
