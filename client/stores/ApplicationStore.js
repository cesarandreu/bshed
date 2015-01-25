var createStore = require('fluxible/utils/createStore');

var ApplicationStore = createStore({
  storeName: 'ApplicationStore',
  handlers: {
    'CHANGE_ROUTE_SUCCESS': 'handleNavigate'
  },
  initialize: function () {
    this.currentRoute = null;
  },
  handleNavigate: function (route) {
    this.currentRoute = route;
    this.emitChange();
  },
  getPageTitle: function () {
    return 'Bikeshed it!';
  },
  getState: function () {
    return {
      currentRoute: this.currentRoute
    };
  },
  dehydrate: function () {
    return this.getState();
  },
  rehydrate: function (state) {
    this.currentRoute = state.currentRoute;
  }
});

module.exports = ApplicationStore;
