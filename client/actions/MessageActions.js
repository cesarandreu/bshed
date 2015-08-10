/**
 * Message actions
 * @flow
 */
import MessageConstants from '../constants/MessageConstants'

export function addMessage (text: string, type: string): Object {
  return {
    type: MessageConstants.ADD,
    payload: { text, type }
  }
}

export function removeMessage (id: string): Object {
  return {
    type: MessageConstants.REMOVE,
    payload: { id }
  }
}
