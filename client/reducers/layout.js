import SidebarConstants from '../constants/SidebarConstants'

export default function layout (state = {}, action) {
  switch (action.type) {
    case SidebarConstants.OPEN:
      state.sidebar = true
      break
    case SidebarConstants.TOGGLE:
      state.sidebar = !state.sidebar
      break
    default:
      state.sidebar = false
      break
  }
  return state
}
