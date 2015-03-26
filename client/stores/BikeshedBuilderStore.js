var {createStore} = require('fluxible/addons'),
  _ = require('lodash')

var BikeshedBuilderStore = createStore({
  storeName: 'BikeshedBuilderStore',
  handlers: {
    'ADD_BIKES_TO_BIKESHED_BUILDER': 'addBikes',
    'REMOVE_BIKE_FROM_BIKESHED_BUILDER': 'removeBike'
  },

  initialize: function () {
    Object.assign(this, {
      index: {},
      bikes: []
    })
  },

  reindex: function () {
    this.index = _.indexBy(this.bikes, 'name')
  },

  addBikes: function (bikes) {
    bikes = bikes
    .filter(bike => {
      var isNew = !this.index[bike.name]
      if (!isNew)
        URL.revokeObjectURL(bike.url)
      return isNew
    })

    this.bikes = this.bikes.concat(bikes)
    this.reindex()
    this.emitChange()
  },

  removeBike: function (idx) {
    var bike = this.bikes.splice(idx, 1)
    URL.revokeObjectURL(bike.url)
    this.reindex()
    this.emitChange()
  },

  getBikes: function () {
    return this.bikes
  },

  getState: function () {
    return {
      bikes: this.bikes,
      index: this.index
    }
  },
  dehydrate: function () {
    return this.getState()
  },
  rehydrate: function (state) {
    Object.assign(this, state)
  }
})

module.exports = BikeshedBuilderStore
