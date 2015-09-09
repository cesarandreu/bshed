/**
 * BikeshedBuilder actions
 * @flow
 */
import BikeshedBuilderConstants from './BikeshedBuilderConstants'
import { URL } from '../../lib/browser'

/**
 * Reset bikeshed builder
 */
export function reset () {
  return ({ getState, dispatch }) => {
    getState().pages.BikeshedBuilder
      .get('images')
      .map(image => image.get('url'))
      .forEach(url => URL.revokeObjectURL(url))

    dispatch({
      type: BikeshedBuilderConstants.RESET
    })
  }
}
