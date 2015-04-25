var {createStore} = require('fluxible/addons'),
  Immutable = require('immutable')

var BikeshedBuilderStore = createStore({
  storeName: 'BikeshedBuilderStore',
  handlers: {
    'OPEN_BIKESHED_BUILDER_DIALOG': 'openDialog',
    'ADD_BIKES_TO_BIKESHED_BUILDER': 'addBikes',
    'REMOVE_BIKE_FROM_BIKESHED_BUILDER': 'removeBike',
    'CLOSE_BIKE_PREVIEW': 'closeBikePreview',
    'OPEN_BIKE_PREVIEW': 'openBikePreview',
    'BIKESHED_BUILDER_FORM_CHANGE': 'handleFormChange'
  },

  initialize: function () {
    this.dialog = Immutable.Map({isOpen: false})
    this.preview = Immutable.Map({bike: null})
    this.bikes = Immutable.OrderedMap()
    this.form = this.defaultForm()
  },

  defaultForm: function () {
    return Immutable.fromJS({
      title: {
        errorText: '', value: ''
      }
    })
  },

  handleFormChange: function ({name, value}={}) {
    if (this.form.keys(name)) {
      this.form = this.form.updateIn([name, 'value'], () => value)
      this.emitChange()
    }
  },

  openDialog: function (isOpen) {
    var dialog = this.dialog.set('isOpen', !!isOpen)
    if (dialog !== this.dialog) {
      this.dialog = dialog
      this.emitChange()
    }
  },

  openBikePreview: function (name) {
    this.preview = Immutable.Map({bike: this.bikes.get(name)})
    this.emitChange()
  },

  closeBikePreview: function () {
    this.preview = Immutable.Map({bike: null})
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
    return this.form
  },

  getBikes: function () {
    return this.bikes
  },

  getDialog: function () {
    return this.dialog
  },

  getPreview: function () {
    return this.preview
  },

  getState: function () {
    return {
      form: this.getForm(),
      bikes: this.getBikes(),
      dialog: this.getDialog(),
      preview: this.getPreview()
    }
  },

  dehydrate: function () {
    return this.getState()
  },

  rehydrate: function ({bikes, preview, dialog, form}={}) {
    this.bikes = Immutable.fromJS(bikes).toOrderedMap()
    this.preview = Immutable.fromJS(preview)
    this.dialog = Immutable.fromJS(dialog)
    this.form = Immutable.fromJS(form)
  }
})

module.exports = BikeshedBuilderStore
