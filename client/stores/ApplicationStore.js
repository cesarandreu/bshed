const createImmutableStore = require('../lib/createImmutableStore')
// const Immutable = require('immutable')

const ApplicationStore = createImmutableStore({
  storeName: 'ApplicationStore',

  handlers: {
    NAVIGATE_FAIL: '_fail',
    NAVIGATE_START: '_start',
    NAVIGATE_SUCCESS: '_success'
  },

  _success () {

  },

  _fail () {

  },

  _start () {

  },

  getPageTitle () {
    return 'Bikeshed it!'
  }
})

module.exports = ApplicationStore
