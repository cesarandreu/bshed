import NavigateConstants from '../../constants/NavigateConstants'
import { describe, it } from 'mocha'
import navigate from '../navigate'
import expect from 'expect.js'

describe('navigate reducer', () => {
  describe('NavigateConstants.NEXT action', () => {
    it('sets url', () => {
      const state = navigate({ url: null }, {
        type: NavigateConstants.NEXT,
        payload: '/path'
      })
      expect(state.url).to.equal('/path')
    })
  })

  describe('NavigateConstants.CLEAR action', () => {
    it('clears url', () => {
      const state = navigate({ url: '/path' }, {
        type: NavigateConstants.CLEAR
      })
      expect(state.url).to.equal(null)
    })
  })
})
