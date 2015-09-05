import SidebarConstants from '../../constants/SidebarConstants'
import * as SidebarActions from '../SidebarActions'
import { describe, it } from 'mocha'
import expect from 'expect.js'

describe('SidebarActions', () => {
  describe('#toggle', () => {
    it('returns TOGGLE action type', () => {
      const { type } = SidebarActions.toggle()
      expect(type).to.equal(SidebarConstants.TOGGLE)
    })
  })

  describe('#close', () => {
    it('returns CLOSE action type', () => {
      const { type } = SidebarActions.close()
      expect(type).to.equal(SidebarConstants.CLOSE)
    })
  })

  describe('#open', () => {
    it('returns OPEN action type', () => {
      const { type } = SidebarActions.open()
      expect(type).to.equal(SidebarConstants.OPEN)
    })
  })
})
