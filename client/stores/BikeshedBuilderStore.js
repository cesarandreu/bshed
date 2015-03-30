var {createStore} = require('fluxible/addons'),
  Immutable = require('immutable')

var BikeshedBuilderStore = createStore({
  storeName: 'BikeshedBuilderStore',
  handlers: {
    'ADD_BIKES_TO_BIKESHED_BUILDER': 'addBikes',
    'REMOVE_BIKE_FROM_BIKESHED_BUILDER': 'removeBike',
    'CLOSE_BIKE_PREVIEW': 'closeBikePreview',
    'OPEN_BIKE_PREVIEW': 'openBikePreview'
  },

  initialize: function () {
    this.preview = Immutable.Map({isOpen: false, bike: null})
    this.bikes = Immutable.OrderedMap()
  },

  openBikePreview: function (name) {
    this.preview = Immutable.Map({isOpen: true, bike: this.bikes.get(name)})
    this.emitChange()
  },

  closeBikePreview: function () {
    this.preview = Immutable.Map({isOpen: false, bike: null})
    this.emitChange()
  },

  addBikes: function (newBikeList) {
    var bikes = this.bikes
    newBikeList.forEach(bike => {
      if (!bikes.has(bike.name)) {
        bike.url = URL.createObjectURL(bike.file)
        bikes = bikes.set(bike.name, Immutable.Map(bike))
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
      URL.revokeObjectURL(bikes.get(name).get('url'))
      this.bikes = bikes.delete(name)
      this.emitChange()
    }
  },

  hasBike: function (name) {
    return this.bikes.has(name)
  },

  getBikes: function () {
    return this.bikes.toArray().map(bike => bike.toObject())
  },

  getPreview: function () {
    return this.preview.toJS()
  },

  getState: function () {
    return {
      bikes: this.getBikes(),
      preview: this.getPreview()
    }
  },

  dehydrate: function () {
    return this.getState()
  },

  rehydrate: function (state) {
    this.bikes = Immutable.OrderedMap(state.bikes)
    this.preview = Immutable.Map(state.preview)
  }
})

module.exports = BikeshedBuilderStore
