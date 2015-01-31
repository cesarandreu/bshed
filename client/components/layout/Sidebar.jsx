var React = require('react/addons'),
  LayoutStore = require('../../stores/LayoutStore'),
  LayoutAction = require('../../actions/Layout'),
  StoreMixin = require('fluxible').StoreMixin,
  {Link, State: StateMixin} = require('react-router'),
  cx = React.addons.classSet;

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
    this.props.context.executeAction(LayoutAction.closeMenu);
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
    }].map((link, idx) => <li key={idx}><Link to={link.path}>{link.text}</Link></li>);

    var className = cx({
      closed: !this.state.openMenu
    });

    var closeMenuOverlay;
    if (this.state.openMenu)
      closeMenuOverlay = <div onTouchTap={this._closeMenu} className='menu-overlay'></div>;

    return (
      <div className='sidebar'>
        <nav className={className}>
          <ul>{links}</ul>
        </nav>
        {closeMenuOverlay}
      </div>

    );
  }
});

module.exports = Sidebar;
