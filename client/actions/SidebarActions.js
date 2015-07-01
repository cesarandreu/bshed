import SidebarConstants from '../constants/SidebarConstants'

export function open (context) {
  context.dispatch(SidebarConstants.OPEN)
}

export function close (context) {
  context.dispatch(SidebarConstants.CLOSE)
}

export function toggle (context) {
  context.dispatch(SidebarConstants.TOGGLE)
}
