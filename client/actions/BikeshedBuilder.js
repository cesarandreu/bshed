var _ = require('lodash')

module.exports = {
  addFiles: function (context, payload) {
    var files = Array.from(payload)
      .filter(f => {
        var isValid = _.includes(['image/png', 'image/jpeg'], f.type)
        // TODO: implement toast handler for invalid types
        if (!isValid)
          context.dispatch('ADD_TOAST_MESSAGE', `File ${f.name} has invalid type ${f.type}`)
        return isValid
      })

    context.dispatch('ADD_BIKES_TO_BIKESHED_BUILDER', files)
  },
  removeBike: function (context, payload) {
    context.dispatch('REMOVE_BIKE_FROM_BIKESHED_BUILDER', payload)
  }
}
