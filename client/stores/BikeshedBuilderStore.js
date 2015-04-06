var {createStore} = require('fluxible/addons'),
  Immutable = require('immutable')

var BikeshedBuilderStore = createStore({
  storeName: 'BikeshedBuilderStore',
  handlers: {
    'ADD_BIKES_TO_BIKESHED_BUILDER': 'addBikes',
    'REMOVE_BIKE_FROM_BIKESHED_BUILDER': 'removeBike',
    'CLOSE_BIKE_PREVIEW': 'closeBikePreview',
    'OPEN_BIKE_PREVIEW': 'openBikePreview',
    'BIKESHED_BUILDER_FORM_CHANGE': 'handleFormChange'
  },

  initialize: function () {
    this.preview = Immutable.fromJS({bike: null})
    this.bikes = Immutable.OrderedMap()
    this.form = this.defaultForm()
  },

  defaultForm: function () {
    return Immutable.fromJS({
      name: {
        name: 'name', errorText: '', value: ''
      }
    })
  },

  handleFormChange: function ({name, value}={}) {
    if (this.form.keys(name)) {
      this.form = this.form.updateIn([name, 'value'], () => value)
      this.emitChange()
    }
  },

  openBikePreview: function (name) {
    this.preview = Immutable.fromJS({bike: this.bikes.get(name)})
    this.emitChange()
  },

  closeBikePreview: function () {
    this.preview = Immutable.fromJS({bike: null})
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

  getForm: function () {
    return this.form.toJS()
  },

  getBikes: function () {
    return this.bikes.toArray().map(bike => bike.toObject())
  },

  getPreview: function () {
    return this.preview.toJS()
  },

  getState: function () {
    return {
      form: this.getForm(),
      bikes: this.getBikes(),
      preview: this.getPreview()
    }
  },

  dehydrate: function () {
    return this.getState()
  },

  rehydrate: function (state) {
    this.bikes = Immutable.OrderedMap(state.bikes)
    this.preview = Immutable.fromJS(state.preview)
    this.form = Immutable.fromJS(state.form)
  }
})

module.exports = BikeshedBuilderStore
