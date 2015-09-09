const createImmutableStore = require('../lib/createImmutableStore')
const BikeshedStore = require('./BikeshedStore')
import Immutable from 'immutable'

const BikeshedRateStore = createImmutableStore({
  storeName: 'BikeshedRateStore',

  handlers: {
    BIKESHED_RATE_RESET: '_reset'
    // BIKESHED_INFO_RECEIVED: '_receiveItem',

    // BIKESHED_LIST_START: '_startList',
    // BIKESHED_LIST_RECEIVED: '_receiveList',

    // BIKESHED_PREVIEW: '_preview',
    // BIKESHED_PREVIEW_DELTA: '_changePreview'
  },

  initialize () {
    this._state = Immutable.fromJS({
      preview: '',
      ratings: []
    })
  },

  getPreview () {
    const state = this._state
    return state.get('preview')
  },

  getCurrent () {
    return {
      ratings: this.getRatings(),
      bikes: this.getBikes()
    }
  },

  getBikes () {
    const bikes = this.dispatcher.getStore(BikeshedStore).getCurrentBikes()
    return bikes.sortBy(bike =>
      bike.get('rating') || bike.get('score')
    )
  },

  getRatings () {
    const state = this._state
    return state.get('ratings')
  },

  _reset () {
    this.mergeState({
      ratings: [],
      preview: ''
    })
  }
})

module.exports = BikeshedRateStore
