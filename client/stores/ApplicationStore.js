var createStore = require('fluxible/utils/createStore');

var ApplicationStore = createStore({
  storeName: 'ApplicationStore',
  handlers: {
    'CHANGE_ROUTE': 'handleNavigate'
  },
  initialize: function () {
    this.route = null;
  },
  handleNavigate: function (route) {
    this.route = route;
    this.emitChange();
  },
  getPageTitle: function () {
    return 'Bikeshed it!';
  },
  getState: function () {
    return {
      route: this.route
    };
  },
  dehydrate: function () {
    return this.getState();
  },
  rehydrate: function (state) {
    this.route = state.route;
  }
});

module.exports = ApplicationStore;
