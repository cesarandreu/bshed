/**
 * Message actions
 * @flow
 */
import NavigateConstants from '../constants/NavigateConstants'

export function navigateTo (url: string): Object {
  return {
    type: NavigateConstants.NEXT,
    payload: url
  }
}

export function clearNavigateTo (): Object {
  return {
    type: NavigateConstants.CLEAR
  }
}
