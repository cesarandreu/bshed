import SidebarConstants from '../constants/SidebarConstants'

/**
 * Sidebar toggle
 */
export function toggle () {
  return {
    type: SidebarConstants.TOGGLE
  }
}

/**
 * Sidebar close
 */
export function close () {
  return {
    type: SidebarConstants.CLOSE
  }
}
