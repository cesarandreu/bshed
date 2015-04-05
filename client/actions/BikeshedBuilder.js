var co = require('co')
var BikeshedBuilderStore = require('../stores/BikeshedBuilderStore')

module.exports = {
  addFiles: co.wrap(function* addFiles (context, payload) {
    var fileList = yield Array.from(payload)
    .filter(file => {
      var isValid = ['image/png', 'image/jpeg'].indexOf(file.type) > -1
      if (!isValid)
        context.dispatch('ADD_TOAST_MESSAGE', `File ${file.name} has invalid type ${file.type}`)
      return isValid
    })
    .map(file => {
      var name = file.name
      return imageSize(file).then(size => ({name, file, size}))
    })

    context.dispatch('ADD_BIKES_TO_BIKESHED_BUILDER', fileList)
  }),

  removeBike: function removeBike (context, payload) {
    context.dispatch('REMOVE_BIKE_FROM_BIKESHED_BUILDER', payload)
  },

  openPreview: function openPreview (context, bikeName) {
    if (context.getStore(BikeshedBuilderStore).hasBike(bikeName))
      context.dispatch('OPEN_BIKE_PREVIEW', bikeName)
    else
      context.dispatch('ADD_TOAST_MESSAGE', `Bike ${bikeName} does not exist`)
  },

  closePreview: function closePreview (context) {
    context.dispatch('CLOSE_BIKE_PREVIEW')
  },

  formChange: function (context, payload) {
    context.dispatch('BIKESHED_BUILDER_FORM_CHANGE', payload)
  }

}

function imageSize (file) {
  return new Promise((resolve, reject) => {
    var img = document.createElement('img')
    var url = URL.createObjectURL(file)
    img.onload = function onload () {
      URL.revokeObjectURL(url)
      resolve({width: img.width, height: img.height})
    }
    img.onerror = function onerror (err) {
      URL.revokeObjectURL(url)
      reject(err)
    }
    img.src = url
  })
}
