const createImmutableStore = require('../lib/createImmutableStore')
const Immutable = require('immutable')

const {Schema, arrayOf, normalize} = require('normalizr')

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

    BIKESHED_PREVIEW: '_preview'
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
    return !this._state.hasIn(['bikesheds', id])
  },

  getPreview () {
    return this._state.get('preview')
  },

  getCurrent () {
    const state = this._state
    const bikeshed = this._state.getIn(['bikesheds', this._state.get('current')])
    const user = this._state.getIn(['users', bikeshed.get('User')])
    const bikes = bikeshed.get('Bikes').reduceRight((bikes, id) => {
      return bikes.set(id, state.getIn(['bikes', id]))
    }, Immutable.OrderedMap())

    return {
      bikeshed,
      bikes,
      user
    }
  },

  getCurrentList () {
    return Immutable.List()
  },

  /**
   * Updates bike preview
   * Cleared if bike isn't found
   * @param {string} name Bike to preview
   */
  _preview (name) {
    const hasBike = this._state.hasIn(['bikes', name])
    this.mergeState({
      preview: hasBike ? name : ''
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
    const {result, entities} = normalize(bikeshedItem, bikeshed)
    this.setState(
      this._state
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
    const {result, entities} = normalize(bikeshedList, arrayOf(bikeshed))
    this.setState(
      this._state
        .set('currentList', result)
        .mergeDeep(
          Immutable.fromJS(entities)
        )
    )
  }
})

module.exports = BikeshedStore
