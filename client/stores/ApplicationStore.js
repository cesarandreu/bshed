const createImmutableStore = require('../lib/createImmutableStore')
// const Immutable = require('immutable')

const ApplicationStore = createImmutableStore({
  storeName: 'ApplicationStore',

  handlers: {
    'NAVIGATE_SUCCESS': 'handleNavigate'
  },

  handleNavigate (route) {
    // this.state = this.state.set('route', route)
    // this.emitChange()
  },

  getPageTitle () {
    return 'Bikeshed it!'
  }
})

module.exports = ApplicationStore
