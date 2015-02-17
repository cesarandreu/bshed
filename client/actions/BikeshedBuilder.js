var _ = require('lodash');

module.exports = {
  addFiles: function (context, payload) {
    // TODO: handle invalid types with a toast
    var files = Array.from(payload).filter(f => _.includes(['image/png', 'image/jpeg'], f.type));
    context.dispatch('ADD_FILES_TO_BIKESHED', files);
  }
};
