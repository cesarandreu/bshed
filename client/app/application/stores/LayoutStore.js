var {createStore} = require('fluxible/addons'),
  Immutable = require('immutable')

var LayoutStore = createStore({
  storeName: 'LayoutStore',
  handlers: {
    'NAVIGATE_SUCCESS': 'closeSidebar',
    'TOGGLE_SIDEBAR': 'toggleSidebar',
    'CLOSE_SIDEBAR': 'closeSidebar',
    'OPEN_SIDEBAR': 'openSidebar'
  },
  initialize: function () {
    this.navbar = Immutable.fromJS({
      title: {
        to: 'home', text: 'Bikeshed it!'
      }
    })

    this.sidebar = Immutable.fromJS({
      open: false
    })
  },

  setSidebar: function (name, value) {
    var sidebar = this.sidebar.set(name, value)
    if (this.sidebar !== sidebar) {
      this.sidebar = sidebar
      this.emitChange()
    }
  },

  toggleSidebar: function () {
    this.setSidebar('open', !this.sidebar.get('open'))
  },
  openSidebar: function () {
    this.setSidebar('open', true)
  },
  closeSidebar: function () {
    this.setSidebar('open', false)
  },

  getNavbar: function () {
    return this.navbar
  },

  getSidebar: function () {
    return this.sidebar
  },

  getState: function () {
    return {
      sidebar: this.sidebar,
      navbar: this.navbar
    }
  },

  dehydrate: function () {
    return this.getState()
  },

  rehydrate: function (state) {
    this.sidebar = Immutable.fromJS(state.sidebar)
    this.navbar = Immutable.fromJS(state.navbar)
  }
})

module.exports = LayoutStore
