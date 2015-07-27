/**
 * messages reducer
 * @flow
 */
import MessageConstants from '../constants/MessageConstants'
import Immutable, { OrderedMap } from 'immutable'
import createReducer from '../lib/createReducer'
import uuid from 'node-uuid'

// Record types
export const Message = Immutable.Record({
  id: '',
  text: '',
  type: 'default'
}, 'message')

export default createReducer(new OrderedMap(), {
  /**
   * Add message
   */
  [MessageConstants.ADD] (state: OrderedMap, { payload }) {
    const { text, type } = payload
    const id = uuid.v1()

    return state.set(id, new Message({ id, text, type }))
  },

  /**
   * Remove message
   */
  [MessageConstants.REMOVE] (state: OrderedMap, { payload }) {
    const { id } = payload
    return state.remove(id)
  }
})
