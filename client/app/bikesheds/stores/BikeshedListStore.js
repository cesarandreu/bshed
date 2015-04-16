var {createStore} = require('fluxible/addons')

var BikeshedListStore = createStore({
  storeName: 'BikeshedListStore',
  handlers: {
    // 'UPDATE_LAYOUT': 'updateLayout',
    'FINISHED_NAVIGATION_REQUEST': 'finishedNavigationRequest'
  },
  initialize: function () {
    Object.assign(this, {
      direction: 'DESC',
      sortBy: 'id',
      per: 12,
      page: 1,
      pages: 1,
      count: 0,
      list: []
    })
  },

  fetch: function (request, {params, pathname, query}={}) {
    return request.get('/api/bikesheds').query(query)
  },

  finishedNavigationRequest: function (item={}) {
    // if (storeName === 'BikeshedListStore') {
    //   setProperties(this, res.body)
    //   this.emitChange()
    // }
  },

  getState: function () {
    var {direction, sortBy, per, page, pages, count, list} = this
    return {direction, sortBy, per, page, pages, count, list}
  },
  dehydrate: function () {
    return this.getState()
  },
  rehydrate: function (state) {
    Object.assign(this, state)
  }
})

module.exports = BikeshedListStore
