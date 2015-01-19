'use strict';

var createStore = require('fluxible/utils/createStore');

var LayoutStore = createStore({
  storeName: 'LayoutStore',
  handlers: {
    'UPDATE_LAYOUT': 'updateLayout'
  },
  initialize: function () {
    this.currentLayout = null;
  },
  updateLayout: function (layout) {
    if (this.currentLayout !== layout) {
      this.currentLayout = layout;
      this.emitChange();
    }
  },
  getLayout: function () {
    return this.currentLayout;
  },
  getState: function () {
    return {
      currentLayout: this.currentLayout
    };
  },
  dehydrate: function () {
    return this.getState();
  },
  rehydrate: function (state) {
    this.currentLayout = state.currentLayout;
  }
});

module.exports = LayoutStore;
