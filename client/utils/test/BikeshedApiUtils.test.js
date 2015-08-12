import * as BikeshedApiUtils from '../BikeshedApiUtils'
import { executeRequestHelper } from './helpers'
import { describe, it } from 'mocha'
import expect from 'expect.js'

describe('BikeshedApiUtils', () => {
  describe('fetchBikeshedList', () => {
    it('sets expected url and options', () => {
      const [ url, opts ] = executeRequestHelper(BikeshedApiUtils.fetchBikeshedList)
      expect(url).to.equal('/api/bikesheds')
      expect(opts).to.eql({ method: 'GET' })
    })
  })

  describe('fetchBikeshedInfo', () => {
    it('sets expected url and options', () => {
      const [ url, opts ] = executeRequestHelper(BikeshedApiUtils.fetchBikeshedInfo, {
        bikeshedId: 1
      })
      expect(url).to.equal('/api/bikesheds/1')
      expect(opts).to.eql({ method: 'GET' })
    })
  })

  describe('createBikeshed', () => {
    it('sets expected url and options', () => {
      const [ url, opts ] = executeRequestHelper(BikeshedApiUtils.createBikeshed, {
        body: {}
      })
      expect(url).to.equal('/api/bikesheds')
      expect(opts).to.eql({ method: 'POST', body: {} })
    })
  })
})
