import MessageConstants from '../constants/MessageConstants'

export function addMessage (text, type) {
  return {
    type: MessageConstants.ADD,
    payload: { text, type }
  }
}

export function removeMessage (id) {
  return {
    type: MessageConstants.REMOVE,
    payload: { id }
  }
}
