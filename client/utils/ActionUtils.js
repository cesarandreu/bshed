/**
 * Action Utils
 * @flow
 */
import { navigateTo } from '../actions/NavigateActions'

export function createNavigateAction (location: Object, actions: Array<Function>) {
  return async ({ dispatch }) => {
    try {
      await Promise.all(actions.map(action => dispatch(action(location))))
    } catch (err) {
      dispatch(navigateTo('/'))
    }
  }
}
