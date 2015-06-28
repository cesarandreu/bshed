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
    console.log('initialize~')
    this._state = Immutable.fromJS({
      active: false
    })
  },

  _open (state) {
    return state.set('active', true)
  },

  _close (state) {
    return state.set('active', false)
  },

  _toggle (state) {
    return state.update('active', active => !active)
  }
})

export default SidebarStore
