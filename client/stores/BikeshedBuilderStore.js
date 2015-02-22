var createStore = require('fluxible/utils/createStore'),
  _ = require('lodash');

var BikeshedBuilderStore = createStore({
  storeName: 'BikeshedBuilderStore',
  handlers: {
    'ADD_FILES_TO_BIKESHED': 'addFiles',
  },
  initialize: function () {
    Object.assign(this, {
      bikes: [],
      bikesIndex: {}
    });
  },

  reindex: function () {
    this.bikesIndex = _.indexBy(this.bikes, 'name');
  },

  addFiles: function (files) {
    files
      .filter(f => !this.bikesIndex[f.name])
      .forEach(f => {
        this.bikes.push({
          file: f,
          name: f.name,
          url: URL.createObjectURL(f)
        });
      });
    this.reindex();
    this.emitChange();
  },

  removeBike: function (idx) {
    URL.revokeObjectURL(this.bikes[idx].url);
    this.bikes.splice(idx, 1);
    this.reindex();
    this.emitChange();
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
