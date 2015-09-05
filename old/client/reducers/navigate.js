/**
 * navigate reducer
 * @flow
 */
import NavigateConstants from '../constants/NavigateConstants'

export default function navigateReducer (state = { url: null }, action: Object): Object {
  switch (action.type) {
    case NavigateConstants.NEXT:
      return { url: action.payload }
    case NavigateConstants.CLEAR:
      return { url: null }
    default:
      return state
  }
}
