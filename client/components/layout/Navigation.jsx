var React = require('react/addons'),
  LayoutStore = require('../../stores/LayoutStore'),
  LayoutAction = require('../../actions/Layout'),
  StoreMixin = require('fluxible').StoreMixin,
  cx = React.addons.classSet;

var Navigation = React.createClass({
  mixins: [StoreMixin],
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

    var className = cx({
      closed: !this.state.openMenu
    });

    var closeMenuOverlay;
    if (this.state.openMenu) {
      closeMenuOverlay = <div onTouchTap={this._closeMenu} className='menu-overlay'></div>;
    }

    return (
      <div className='left-nav'>
        <nav className={className}></nav>
        {closeMenuOverlay}
      </div>

    );
  }
});

module.exports = Navigation;
