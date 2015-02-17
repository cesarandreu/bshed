var createStore = require('fluxible/utils/createStore');

var BikeshedBuilderStore = createStore({
  storeName: 'BikeshedBuilderStore',
  handlers: {
    'ADD_FILES_TO_BIKESHED': 'addFiles',
  },
  initialize: function () {
    Object.assign(this, {
      bikes: []
    });
  },

  addFiles: function (files) {
    console.log('files!', files);
  },

  getBikes: function () {
    return this.bikes;
  },

  getState: function () {
    var {bikes} = this;
    return {bikes}
  },
  dehydrate: function () {
    return this.getState();
  },
  rehydrate: function (state) {
    Object.assign(this, state);
  }
});

module.exports = BikeshedBuilderStore;
