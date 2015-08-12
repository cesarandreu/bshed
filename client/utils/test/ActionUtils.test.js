import { createNavigateAction } from '../ActionUtils'
import { describe, it } from 'mocha'
import expect from 'expect.js'

describe('ActionUtils', () => {
  describe('createNavigateAction', () => {
    const location = {}

    it('calls each action with location', async () => {
      const params = []
      await createNavigateAction(location, [
        param => { params.push(param)},
        param => { params.push(param)}
      ])({ dispatch () {} })

      expect(params.length).to.equal(2)
      params.forEach(param =>
        expect(param).to.equal(location)
      )
    })

    it('calls dispatch with action result', async () => {
      const params = []
      await createNavigateAction(location, [
        () => 0,
        () => 1
      ])({
        dispatch (param) {
          params.push(param)
        }
      })

      expect(params.length).to.equal(2)
      params.forEach((param, idx) => {
        expect(param).to.equal(idx)
      })
    })

    it('calls dispatch when any action creator fails', async () => {
      const params = []
      await createNavigateAction(location, [
        () => 0,
        () => 1
      ])({
        dispatch (param) {
          params.push(param)
          return params.length < 2 ? Promise.reject(param) : param
        }
      })
      expect(params.length).to.equal(3)
    })

  })
})
