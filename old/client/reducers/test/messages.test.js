import MessageConstants from '../../constants/MessageConstants'
import messages, { Message } from '../messages'
import { OrderedMap } from 'immutable'
import { describe, it } from 'mocha'
import expect from 'expect.js'

describe('messages reducer', () => {
  describe('MessageConstants.ADD action', () => {
    it('adds a new message', () => {
      const state = messages(OrderedMap(), {
        type: MessageConstants.ADD,
        payload: { text: 'text', type: 'type' }
      })
      expect(state.count()).to.equal(1)

      const message = state.last()
      expect(message).to.be.a(Message)
      expect(message.text).to.be('text')
      expect(message.type).to.be('type')
    })
  })

  describe('MessageConstants.REMOVE action', () => {
    it('removes a message', () => {
      const state = messages(OrderedMap({
        id: new Message({ id: 'id' })
      }), {
        type: MessageConstants.REMOVE,
        payload: { id: 'id' }
      })
      expect(state.count()).to.equal(0)
    })
  })
})
