/**
 * messages reducer
 * @flow
 */
import MessageConstants from '../constants/MessageConstants'
import createReducer from '../lib/createReducer'
import { OrderedMap, Record } from 'immutable'
import uuid from 'node-uuid'

// Record types
export const Message = Record({
  id: '',
  text: '',
  type: 'default'
}, 'message')

export default createReducer(OrderedMap(), {
  /**
   * Add message
   */
  [MessageConstants.ADD] (state: OrderedMap, { payload }): OrderedMap {
    const { text, type } = payload
    const id = uuid.v1()

    return state.set(id, new Message({ id, text, type }))
  },

  /**
   * Remove message
   */
  [MessageConstants.REMOVE] (state: OrderedMap, { payload }): OrderedMap {
    const { id } = payload
    return state.remove(id)
  }
})
