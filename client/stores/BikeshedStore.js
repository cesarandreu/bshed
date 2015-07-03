const createImmutableStore = require('../lib/createImmutableStore')
import Immutable from 'immutable'

const { Schema, arrayOf, normalize } = require('normalizr')
const bikeshed = new Schema('bikesheds')
const bike = new Schema('bikes')
const user = new Schema('users')

bikeshed.define({
  Bikes: arrayOf(bike),
  User: user
})

const BikeshedStore = createImmutableStore({
  storeName: 'BikeshedStore',

  handlers: {
    BIKESHED_INFO_START: '_startItem',
    BIKESHED_INFO_RECEIVED: '_receiveItem',

    BIKESHED_LIST_START: '_startList',
    BIKESHED_LIST_RECEIVED: '_receiveList',

    BIKESHED_PREVIEW: '_preview',
    BIKESHED_PREVIEW_DELTA: '_changePreview'
  },

  initialize () {
    this._state = Immutable.fromJS({
      bikesheds: {},
      users: {},
      bikes: {},

      currentList: [],
      current: '',
      preview: ''
    })
  },

  waitForInfo (id) {
    const state = this._state
    return !state.hasIn(['bikesheds', id])
  },

  getPreview () {
    const state = this._state
    return state.get('preview')
  },

  getCurrentBikeshed () {
    const state = this._state
    return state.getIn(['bikesheds', state.get('current')])
  },

  getCurrentUser () {
    const state = this._state
    const bikeshed = this.getCurrentBikeshed()
    return state.getIn(['users', bikeshed.get('User')])
  },

  getCurrentBikes () {
    const state = this._state
    const bikeshed = this.getCurrentBikeshed()
    return bikeshed.get('Bikes')
      .map(id =>
        state.getIn(['bikes', id])
      )
      .sortBy(bike =>
        bike.get('score')
      )
  },

  getCurrent () {
    return {
      bikeshed: this.getCurrentBikeshed(),
      bikes: this.getCurrentBikes(),
      user: this.getCurrentUser()
    }
  },

  getCurrentList () {
    return Immutable.List()
  },

  /**
   * Updates bike preview
   * Cleared if bike isn't found
   * @param {string} bikeId Bike ID to preview
   */
  _preview (bikeId) {
    const state = this._state
    const hasBike = state.hasIn(['bikes', bikeId])
    this.mergeState({
      preview: hasBike ? bikeId : ''
    })
  },

  /**
   * Change bike in preview
   * Use 1 to show the next image and -1 for the previous
   * @param {number} [delta=0] Positions by which to change preview
   */
  _changePreview (delta=0) {
    const state = this._state
    const bikeList = this.getCurrentBikes()
    const currentPreview = state.get('preview')
    const bikeIndex = bikeList.findIndex(bike =>
      bike.get('id') === currentPreview
    )

    const newPreview = bikeList.getIn([(bikeIndex + delta) % bikeList.count(), 'id'])
    this.mergeState({
      preview: newPreview
    })
  },

  /**
   * Navigating to bikeshed
   */
  _startItem (bikeshedId) {
    this.mergeState({
      current: bikeshedId,
      preview: ''
    })
  },

  /**
   * Navigating to bikeshed list
   */
  _startList () {
    this.mergeState({
      currentList: Immutable.List(),
      preview: ''
    })
  },

  /**
   * Receive bikeshed
   */
  _receiveItem (bikeshedItem) {
    const state = this._state
    const {result, entities} = normalize(bikeshedItem, bikeshed)
    this.setState(
      state
        .set('current', result)
        .mergeDeep(
          Immutable.fromJS(entities)
        )
    )
  },

  /**
   * Receive bikeshed list
   */
  _receiveList (bikeshedList) {
    const state = this._state
    const {result, entities} = normalize(bikeshedList, arrayOf(bikeshed))
    this.setState(
      state
        .set('currentList', result)
        .mergeDeep(
          Immutable.fromJS(entities)
        )
    )
  }
})

module.exports = BikeshedStore
