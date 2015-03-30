var {createStore} = require('fluxible/addons'),
  Immutable = require('immutable')

var ApplicationStore = createStore({
  storeName: 'ApplicationStore',
  handlers: {
    'CHANGE_ROUTE_SUCCESS': 'handleNavigate'
  },
  initialize: function () {
    this.state = Immutable.Map()
  },
  handleNavigate: function (route) {
    if (this.state.get('route') !== route) {
      this.state = this.state.set('route', route)
      this.emitChange()
    }
  },
  getPageTitle: function () {
    return 'Bikeshed it!'
  },
  getRoute: function () {
    return this.state.get('route')
  },
  getState: function () {
    return this.state.toJS()
  },
  dehydrate: function () {
    return this.getState()
  },
  rehydrate: function (state) {
    this.state = Immutable.Map(state)
  }
})

module.exports = ApplicationStore
