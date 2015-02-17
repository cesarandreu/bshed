var createStore = require('fluxible/utils/createStore');

var BikeshedBuilderStore = createStore({
  storeName: 'BikeshedBuilderStore',
  // handlers: {
  //   'UPDATE_LAYOUT': 'updateLayout',
  // },
  initialize: function () {
    Object.assign(this, {
      bikes: []
    });
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
