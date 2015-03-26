var React = require('react/addons'),
  ActionMixin = require('../../utils/mixins/ActionMixin'),
  StoreMixin = require('../../utils/mixins/StoreMixin'),
  LayoutStore = require('../../stores/LayoutStore'),
  LayoutAction = require('../../actions/Layout'),
  {Link} = require('react-router')

var Sidebar = React.createClass({
  mixins: [ActionMixin, StoreMixin],
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
