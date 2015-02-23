var createStore = require('fluxible/utils/createStore'),
  _ = require('lodash');

class Bike {
  constructor (file) {
    this.file = file;
    this.name = file.name;
    this.url = URL.createObjectURL(file);
  }

  destroy () {
    this.url = URL.revokeObjectURL(this.url);
  }
}

var BikeshedBuilderStore = createStore({
  storeName: 'BikeshedBuilderStore',
  handlers: {
    'ADD_BIKES_TO_BIKESHED_BUILDER': 'addBikes',
    'REMOVE_BIKE_FROM_BIKESHED_BUILDER': 'removeBike'
  },

  initialize: function () {
    Object.assign(this, {
      index: {},
      bikes: []
    });
  },

  Bike: Bike,

  reindex: function () {
    this.index = _.indexBy(this.bikes, 'name');
  },

  addBikes: function (files) {
    var bikes = files
      .filter(file => !this.index[file.name])
      .map(file => new Bike(file));

    this.bikes = this.bikes.concat(bikes);
    this.reindex();
    this.emitChange();
  },

  removeBike: function (idx) {
    var bike = this.bikes.splice(idx, 1);
    bike.destroy();
    this.reindex();
    this.emitChange();
  },

  getBikes: function () {
    return this.bikes;
  },

  getState: function () {
    var {bikes, index} = this;
    return {bikes, index}
  },
  dehydrate: function () {
    return this.getState();
  },
  rehydrate: function (state) {
    Object.assign(this, state);
  }
});

module.exports = BikeshedBuilderStore;
