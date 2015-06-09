require('./Sidebar.less')

const React = require('react')
const cn = require('classnames')
const hotkey = require('react-hotkey')
const {Link} = require('react-router')
const Immutable = require('immutable')
const {connectToStores} = require('fluxible/addons')
const ActionMixin = require('../../../lib/ActionMixin')
const SidebarStore = require('../../../stores/SidebarStore')
const SidebarActions = require('../../../actions/SidebarActions')
const ImmutableRenderMixin = require('react-immutable-render-mixin')

var Sidebar = React.createClass({
  mixins: [
    ActionMixin,
    ImmutableRenderMixin,
    hotkey.Mixin('_handleHotkey')
  ],

  propTypes: {
    sidebar: React.PropTypes.instanceOf(Immutable.Map).isRequired
  },

  render () {
    const {sidebar} = this.props

    const links = [{
      path: '/',
      text: 'Home'
    }, {
      path: '/bikesheds',
      text: 'Bikesheds'
    }, {
      path: '/about',
      text: 'About'
    }]

    const className = cn('sidebar-container', {
      'is-open': sidebar.get('isOpen')
    })

    return (
      <div className={className}>
        <nav className='sidebar'>
          <div className='sidebar-section'>
            {links.map((link, idx) =>
              <Link
                key={idx}
                to={link.path}
              >
                {link.text}
              </Link>
            )}
          </div>
        </nav>
        <div
          className='sidebar-overlay'
          onClick={this._closeSidebar}
        />
      </div>
    )
  },

  _closeSidebar () {
    this.executeAction(SidebarActions.close)
  },

  _handleHotkey (e) {
    if (e.key === 'Escape') {
      this.executeAction(SidebarActions.close)
      e.stopPropagation()
    }
  }
})

Sidebar = connectToStores(Sidebar, [SidebarStore], stores => {
  return {
    sidebar: stores.SidebarStore.getState()
  }
})

module.exports = Sidebar
