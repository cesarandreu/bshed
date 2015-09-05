import MessageConstants from '../../constants/MessageConstants'
import * as MessageActions from '../MessageActions'
import { describe, it } from 'mocha'
import expect from 'expect.js'

describe('MessageActions', () => {
  describe('addMessage', () => {
    it('returns ADD action', () => {
      const { type, payload } = MessageActions.addMessage('text', 'type')
      expect(type).to.equal(MessageConstants.ADD)
      expect(payload).to.eql({ text: 'text', type: 'type' })
    })
  })

  describe('removeMessage', () => {
    it('returns REMOVE action', () => {
      const { type, payload } = MessageActions.removeMessage('id')
      expect(type).to.equal(MessageConstants.REMOVE)
      expect(payload).to.eql({ id: 'id' })
    })
  })
})
