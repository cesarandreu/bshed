import NavigateConstants from '../../constants/NavigateConstants'
import * as NavigateActions from '../NavigateActions'
import { describe, it } from 'mocha'
import expect from 'expect.js'

describe('NavigateActions', () => {
  describe('navigateTo', () => {
    it('returns NEXT action', () => {
      const { type, payload } = NavigateActions.navigateTo('/path')
      expect(type).to.equal(NavigateActions.NEXT)
      expect(payload).to.equal('/path')
    })
  })

  describe('clearNavigateTo', () => {
    it('returns CLEAR action', () => {
      const { type } = NavigateActions.clearNavigateTo()
      expect(type).to.equal(NavigateConstants.CLEAR)
    })
  })
})
