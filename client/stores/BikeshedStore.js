const createImmutableStore = require('../lib/createImmutableStore')
const Immutable = require('immutable')
const _ = require('lodash')

const BikeshedStore = createImmutableStore({
  storeName: 'BikeshedStore',

  handlers: {
    BIKESHED_INFO_START: '_infoStart',

    BIKESHED_LIST_RECEIVED: '_receiveList',
    BIKESHED_INFO_RECEIVED: '_receive'
  },

  initialize () {
    this._state = Immutable.fromJS({
      _bikes: Immutable.OrderedMap(),
      currentList: [],
      current: null
    })
  },

  waitForInfo (id) {
    return !this._state.hasIn(['_bikes', id])
  },

  getCurrent () {
    return this._state.getIn(['_bikes', this._state.get('current')], Immutable.Map())
  },

  getCurrentList () {
    return {}
  },

  _infoStart (bikeshedId) {
    this.mergeState({
      current: bikeshedId
    })
  },

  /**
   * Receive bikeshed
   */
  _receive (item) {
    item = Immutable.fromJS(item)
    this.setState(
      this._state.setIn(['_bikes', item.get('id')], item)
    )
  },

  /**
   * Receive bikesheds
   */
  _receiveList (list) {
    this.mergeState({
      _bikes: this._state.get('_bikes').merge(
        Immutable.fromJS(_.indexBy(list, 'id'))
      )
    })
  }
})

module.exports = BikeshedStore
