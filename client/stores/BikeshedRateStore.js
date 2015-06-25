const createImmutableStore = require('../lib/createImmutableStore')
// const BikeshedStore = require('./BikeshedStore')
import Immutable from 'immutable'

const BikeshedRateStore = createImmutableStore({
  storeName: 'BikeshedRateStore',

  handlers: {
    BIKESHED_INFO_START: '_startItem'
    // BIKESHED_INFO_RECEIVED: '_receiveItem',

    // BIKESHED_LIST_START: '_startList',
    // BIKESHED_LIST_RECEIVED: '_receiveList',

    // BIKESHED_PREVIEW: '_preview',
    // BIKESHED_PREVIEW_DELTA: '_changePreview'
  },

  initialize () {
    this._state = Immutable.fromJS({
      preview: '',
      ratings: {}
    })
  },

  getPreview () {
    return this._state.get('preview')
  },

  getRatings (bikes) {
    const ratings = this._state.get('ratings')

    // Save if we have any pending ratings
    if (ratings.count()) {
      return ratings
    } else if (bikes.any(bike => bike.get('rating'))) {
      return bikes.sortBy(bike => bike.get('rating'))
    } else {

    }
  },

  _startItem () {
    this.mergeState({
      ratings: Immutable.Map(),
      preview: ''
    })
  }

  // getPreview () {
  //   return this._state.get('preview')
  // },

  // getCurrent () {
  //   const state = this._state
  //   const bikeshed = this._state.getIn(['bikesheds', this._state.get('current')])
  //   const user = this._state.getIn(['users', bikeshed.get('User')])
  //   const bikes = bikeshed.get('Bikes').reduceRight((bikes, id) => {
  //     return bikes.set(id, state.getIn(['bikes', id]))
  //   }, Immutable.OrderedMap())

  //   return {
  //     bikeshed,
  //     bikes,
  //     user
  //   }
  // },

  // getCurrentList () {
  //   return Immutable.List()
  // },

  // /**
  //  * Updates bike preview
  //  * Cleared if bike isn't found
  //  * @param {string} bikeId Bike ID to preview
  //  */
  // _preview (bikeId) {
  //   const hasBike = this._state.hasIn(['bikes', bikeId])
  //   this.mergeState({
  //     preview: hasBike ? bikeId : ''
  //   })
  // },

  // /**
  //  * Change bike in preview
  //  * Use 1 to show the next image and -1 for the previous
  //  * @param {number} [delta=0] Positions by which to change preview
  //  */
  // _changePreview (delta=0) {
  //   const preview = this._state.get('preview')
  //   const current = this._state.get('current')
  //   const bikes = this._state.getIn(['bikesheds', current, 'Bikes'])
  //   const bikeIndex = bikes.findIndex(bikeId => bikeId === preview)
  //   if (bikeIndex !== -1) {
  //     const bikesCount = bikes.count()
  //     this.mergeState({
  //       preview: bikes.get((bikeIndex + delta) % bikesCount)
  //     })
  //   }
  // },

  // /**
  //  * Navigating to bikeshed
  //  */
  // _startItem (bikeshedId) {
  //   this.mergeState({
  //     current: bikeshedId,
  //     preview: ''
  //   })
  // },

  // /**
  //  * Navigating to bikeshed list
  //  */
  // _startList () {
  //   this.mergeState({
  //     currentList: Immutable.List(),
  //     preview: ''
  //   })
  // },

  // /**
  //  * Receive bikeshed
  //  */
  // _receiveItem (bikeshedItem) {
  //   const {result, entities} = normalize(bikeshedItem, bikeshed)
  //   this.setState(
  //     this._state
  //       .set('current', result)
  //       .mergeDeep(
  //         Immutable.fromJS(entities)
  //       )
  //   )
  // },

  // /**
  //  * Receive bikeshed list
  //  */
  // _receiveList (bikeshedList) {
  //   const {result, entities} = normalize(bikeshedList, arrayOf(bikeshed))
  //   this.setState(
  //     this._state
  //       .set('currentList', result)
  //       .mergeDeep(
  //         Immutable.fromJS(entities)
  //       )
  //   )
  // }
})

module.exports = BikeshedRateStore
