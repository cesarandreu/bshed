const createImmutableStore = require('../lib/createImmutableStore')
import Immutable from 'immutable'

const SidebarStore = createImmutableStore({
  storeName: 'SidebarStore',

  handlers: {
    NAVIGATE_START: '_close',
    SIDEBAR_CLOSE: '_close',
    SIDEBAR_TOGGLE: '_toggle'
  },

  initialize () {
    this._state = Immutable.fromJS({
      isOpen: false
    })
  },

  _close () {
    this.mergeState({
      isOpen: false
    })
  },

  _toggle () {
    this.setState(
      this._state.update('isOpen', isOpen => !isOpen)
    )
  }
})

module.exports = SidebarStore
