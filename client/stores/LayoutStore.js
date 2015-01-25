var createStore = require('fluxible/utils/createStore');

var LayoutStore = createStore({
  storeName: 'LayoutStore',
  handlers: {
    'UPDATE_LAYOUT': 'updateLayout',
    'TOGGLE_MENU': 'toggleMenu',
    'OPEN_MENU': 'openMenu',
    'CLOSE_MENU': 'closeMenu'
  },
  initialize: function () {
    this.currentLayout = null;
    this.openMenu = false;
  },
  updateLayout: function (layout) {
    if (this.currentLayout !== layout) {
      this.currentLayout = layout;
      this.emitChange();
    }
  },
  toggleMenu: function () {
    this.openMenu = !this.openMenu;
    this.emitChange();
  },
  openMenu: function () {
    if (this.openMenu !== true) {
      this.openMenu = true;
      this.emitChange();
    }
  },
  closeMenu: function () {
    if (this.openMenu !== false) {
      this.openMenu = false;
      this.emitChange();
    }
  },
  getLayout: function () {
    return this.currentLayout;
  },
  getState: function () {
    return {
      currentLayout: this.currentLayout,
      openMenu: this.openMenu
    };
  },
  dehydrate: function () {
    return this.getState();
  },
  rehydrate: function (state) {
    this.currentLayout = state.currentLayout;
    this.openMenu = state.openMenu;
  }
});

module.exports = LayoutStore;
