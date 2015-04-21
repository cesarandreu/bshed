var co = require('co')

module.exports = {
  addFiles: co.wrap(function* addFiles (context, payload) {
    var browserImageSize = require('browser-image-size')
    var fileList = yield Array.from(payload)
    .filter(file => {
      var isValid = ['image/png', 'image/jpeg'].indexOf(file.type) > -1
      if (!isValid)
        context.dispatch('ADD_TOAST_MESSAGE', `File ${file.name} has invalid type ${file.type}`)
      return isValid
    })
    .map(file => {
      var name = file.name
      return browserImageSize(file).then(size => ({name, file, size}))
    })

    context.dispatch('ADD_BIKES_TO_BIKESHED_BUILDER', fileList)
  }),

  removeBike: function removeBike (context, payload) {
    context.dispatch('REMOVE_BIKE_FROM_BIKESHED_BUILDER', payload)
  },

  openPreview: function openPreview (context, bikeName) {
    context.dispatch('OPEN_BIKE_PREVIEW', bikeName)
  },

  closePreview: function closePreview (context) {
    context.dispatch('CLOSE_BIKE_PREVIEW')
  },

  openDialog: function (context) {
    context.dispatch('OPEN_BIKESHED_BUILDER_DIALOG', true)
  },

  closeDialog: function (context) {
    context.dispatch('OPEN_BIKESHED_BUILDER_DIALOG', false)
  },

  formChange: function (context, payload) {
    context.dispatch('BIKESHED_BUILDER_FORM_CHANGE', payload)
  }

}
