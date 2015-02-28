var createStore = require('fluxible/utils/createStore')

var LayoutStore = createStore({
  storeName: 'LayoutStore',
  handlers: {
    'CHANGE_ROUTE_SUCCESS': 'closeMenu',
    'TOGGLE_LAYOUT_MENU': 'toggleMenu',
    'OPEN_LAYOUT_MENU': 'openMenu',
    'CLOSE_LAYOUT_MENU': 'closeMenu'
  },
  initialize: function () {
    this.openMenu = false
  },
  toggleMenu: function () {
    this.openMenu = !this.openMenu
    this.emitChange()
  },
  openMenu: function () {
    if (this.openMenu !== true) {
      this.openMenu = true
      this.emitChange()
    }
  },
  closeMenu: function () {
    if (this.openMenu !== false) {
      this.openMenu = false
      this.emitChange()
    }
  },
  getState: function () {
    return {
      openMenu: this.openMenu
    }
  },
  dehydrate: function () {
    return this.getState()
  },
  rehydrate: function (state) {
    this.openMenu = state.openMenu
  }
})

module.exports = LayoutStore
