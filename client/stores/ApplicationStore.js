var createStore = require('fluxible/utils/createStore'),
  routes = require('../configs/routes');

var ApplicationStore = createStore({
  storeName: 'ApplicationStore',
  handlers: {
    'CHANGE_ROUTE_SUCCESS': 'handleNavigate',
    'UPDATE_PAGE_TITLE': 'updatePageTitle'
  },
  initialize: function () {
    this.currentPageName = null;
    this.currentPage = null;
    this.currentRoute = null;
    this.pages = routes;
    this.pageTitle = '';
  },
  handleNavigate: function (route) {
    var pageName = route.config.page;
    var page = this.pages[pageName];

    if (pageName !== this.getCurrentPageName()) {
      this.currentPageName = pageName;
      this.currentPage = page;
      this.currentRoute = route;
      this.emitChange();
    }
  },
  updatePageTitle: function (title) {
    this.pageTitle = title.pageTitle;
    this.emitChange();
  },
  getCurrentPageName: function () {
    return this.currentPageName;
  },
  getPageTitle: function () {
    return this.pageTitle;
  },
  getState: function () {
    return {
      currentPageName: this.currentPageName,
      currentPage: this.currentPage,
      pages: this.pages,
      route: this.currentRoute,
      pageTitle: this.pageTitle
    };
  },
  dehydrate: function () {
    return this.getState();
  },
  rehydrate: function (state) {
    ['currentPageName', 'currentPage', 'pageTitle', 'pages', 'route']
      .map((value) => this[value] = state[value]);
  }
});

module.exports = ApplicationStore;
