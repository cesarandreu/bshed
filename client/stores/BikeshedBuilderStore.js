var {createStore} = require('fluxible/addons'),
  Immutable = require('immutable')

var BikeshedBuilderStore = createStore({
  storeName: 'BikeshedBuilderStore',
  handlers: {
    'ADD_BIKES_TO_BIKESHED_BUILDER': 'addBikes',
    'REMOVE_BIKE_FROM_BIKESHED_BUILDER': 'removeBike'
  },

  initialize: function () {
    this.bikes = Immutable.OrderedMap()
  },

  addBikes: function (newBikeList) {
    var bikes = this.bikes
    newBikeList.forEach(bike => {
      if (!bikes.has(bike.name)) {
        bike.url = URL.createObjectURL(bike.file)
        bikes = bikes.set(bike.name, bike)
      }
    })
    if (bikes !== this.bikes) {
      this.bikes = bikes
      this.emitChange()
    }
  },

  removeBike: function (name) {
    var bikes = this.bikes
    if (bikes.has(name)) {
      URL.revokeObjectURL(bikes.get(name).url)
      this.bikes = bikes.delete(name)
      this.emitChange()
    }
  },

  getBikes: function () {
    return this.bikes
  },

  getState: function () {
    return {
      bikes: this.bikes.toArray()
    }
  },

  dehydrate: function () {
    return {
      bikes: this.bikes.toObject()
    }
  },

  rehydrate: function (state={}) {
    this.bikes = Immutable.OrderedMap(state.bikes)
  }
})

module.exports = BikeshedBuilderStore
