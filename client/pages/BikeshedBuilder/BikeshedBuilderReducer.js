/**
 * BikeshedBuilder reducer
 * @flow
 */
import BikeshedBuilderConstants from './BikeshedBuilderConstants'
import createReducer from '../../lib/createReducer'
import { Record, OrderedMap } from 'immutable'

export const BikeshedBuilderState = Record({
  images: OrderedMap(),
  createdBikeshed: 0,
  submitting: false,
  description: '',
  preview: ''
}, 'BikeshedBuilder')

export default createReducer(BikeshedBuilderState(), {
  [BikeshedBuilderConstants.RESET] () {
    return BikeshedBuilderState()
  }
})
