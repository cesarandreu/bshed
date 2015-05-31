const createImmutableStore = require('../lib/createImmutableStore')
const Immutable = require('immutable')

const NavbarStore = createImmutableStore({
  storeName: 'NavbarStore',

  handlers: {
  },

  initialize () {
    this._state = Immutable.fromJS({
      title: 'Bikeshed it!',
      to: 'home'
    })
  }
})

module.exports = NavbarStore
