import SidebarConstants from '../constants/SidebarConstants'

/**
 * Sidebar toggle
 */
export function toggle (context) {
  context.dispatch(SidebarConstants.TOGGLE)
}

/**
 * Sidebar close
 */
export function close (context) {
  context.dispatch(SidebarConstants.CLOSE)
}
