import createImmutableStore from '../lib/createImmutableStore'
import SidebarConstants from '../constants/SidebarConstants'
import Immutable from 'immutable'

const SidebarStore = createImmutableStore({
  storeName: 'SidebarStore',
  handlers: {
    [SidebarConstants.OPEN]: '_open',
    [SidebarConstants.CLOSE]: '_close',
    [SidebarConstants.TOGGLE]: '_toggle'
  },

  initialize () {
    this._state = Immutable.fromJS({
      active: false
    })
  },

  _open () {
    this.mergeState({
      active: true
    })
  },

  _close () {
    this.mergeState({
      active: false
    })
  },

  _toggle () {
    const state = this.getState().update('active', active => !active)
    this.setState(state)
  }
})

export default SidebarStore
