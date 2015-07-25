/**
 * layout reducer
 * @flow
 */
import SidebarConstants from '../constants/SidebarConstants'
import createReducer from '../lib/createReducer'
import Immutable from 'immutable'

// Record types
export const LayoutState = Immutable.Record({
  sidebar: false
}, 'sidebarState')

// layout reducer
export default createReducer(new LayoutState(), {
  /**
   * Open sidebar
   */
  [SidebarConstants.OPEN] (state: LayoutState) {
    return state.set('sidebar', true)
  },

  /**
   * Close sidebar
   */
  [SidebarConstants.CLOSE] (state: LayoutState) {
    return state.set('sidebar', false)
  },

  /**
   * Toggle sidebar
   */
  [SidebarConstants.TOGGLE] (state: LayoutState) {
    return state.update('sidebar', sidebar => !sidebar)
  }
})
