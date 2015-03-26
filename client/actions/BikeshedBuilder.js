var co = require('co'),
  _ = require('lodash')

module.exports = {
  addFiles: co.wrap(function* (context, payload) {
    var files = Array.from(payload)
      .filter(file => {
        var isValid = _.includes(['image/png', 'image/jpeg'], file.type)
        if (!isValid) // TODO: implement toast handler for invalid types
          context.dispatch('ADD_TOAST_MESSAGE', `File ${file.name} has invalid type ${file.type}`)
        return isValid
      })
      .map(file => {
        var url = URL.createObjectURL(file)
        var name = file.name
        return {file, url, name}
      })

    var sizes = yield files.map(file => imageSize(file.url))
    files.forEach((file, idx) => file.size = sizes[idx])

    context.dispatch('ADD_BIKES_TO_BIKESHED_BUILDER', files)
  }),

  removeBike: function (context, payload) {
    context.dispatch('REMOVE_BIKE_FROM_BIKESHED_BUILDER', payload)
  }
}

function imageSize (url) {
  return new Promise((resolve, reject) => {
    var img = document.createElement('img')
    img.onload = function () {
      resolve({width: img.width, height: img.height})
    }
    img.onerror = function (err) {
      reject(err)
    }
    img.src = url
  })
}
