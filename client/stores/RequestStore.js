var createStore = require('fluxible/utils/createStore')

var RequestStore = createStore({
  storeName: 'RequestStore',
  handlers: {
    'NEW_NAVIGATION_REQUEST': 'newNavigationRequest',
    'START_NAVIGATION_REQUESTS': 'abortNavigationRequests',
    'FAILED_NAVIGATION_REQUESTS': 'abortNavigationRequests',
    'FINISHED_NAVIGATION_REQUESTS': 'clearNavigationRequest'
  },
  initialize: function () {
    this.navigationRequests = []
  },
  newNavigationRequest: function (req) {
    this.navigationRequests.push(req)
    this.emitChange()
  },
  clearNavigationRequest: function () {
    while (this.navigationRequests.length) this.navigationRequests.pop()
  },
  abortNavigationRequests: function () {
    while (this.navigationRequests.length) this.navigationRequests.pop().abort()
  },
  getState: function () {
    return {
      navigationRequests: this.navigationRequests
    }
  },
  dehydrate: function () {
    return this.getState()
  },
  rehydrate: function (state) {
    this.navigationRequests = state.navigationRequests
  }
})

module.exports = RequestStore
