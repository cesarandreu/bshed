import BikeshedBuilderConstants from '../../constants/BikeshedBuilderConstants'
import * as BikeshedBuilderActions from '../BikeshedBuilderActions'
import { describe, it } from 'mocha'
import expect from 'expect.js'

describe('BikeshedBuilderActions', () => {
  describe('#inputChange', () => {
    it('returns INPUT_CHANGE action type with name and value', () => {
      const { type, value, name } = BikeshedBuilderActions.inputChange({
        value: 'value',
        name: 'name'
      })
      expect(type).to.equal(BikeshedBuilderConstants.INPUT_CHANGE)
      expect(value).to.equal('value')
      expect(name).to.equal('name')
    })
  })

  describe('#submit', () => {
    it('returns SUBMIT action type', () => {
      const { type } = BikeshedBuilderActions.submit()
      expect(type).to.equal(BikeshedBuilderConstants.SUBMIT)
    })
  })

  describe('#addImages', () => {
    it('dispatches ADD_IMAGES with transformed imageList', async () => {
      function fakeBrowserImageSize () {
        return new Promise(resolve => resolve({ height: 0, width: 0 }))
      }

      try {
        BikeshedBuilderActions.__Rewire__('browserImageSize', fakeBrowserImageSize)
        const fakeList = [{ name: 'name' }]
        const { type, imageList } = await new Promise(BikeshedBuilderActions.addImages(fakeList))
        const { name, file, height, width } = imageList[0]

        expect(type).to.equal(BikeshedBuilderConstants.ADD_IMAGES)
        expect(file).to.equal(fakeList[0])
        expect(name).to.equal('name')
        expect(height).to.equal(0)
        expect(width).to.equal(0)

      } finally {
        BikeshedBuilderActions.__ResetDependency__('browserImageSize')
      }
    })
  })

  describe('#removeImage', () => {
    it('returns REMOVE_IMAGE action type and name', () => {
      const { type, name } = BikeshedBuilderActions.removeImage('name')
      expect(type).to.equal(BikeshedBuilderConstants.REMOVE_IMAGE)
      expect(name).to.equal('name')
    })
  })

  describe('#preview', () => {
    it('returns PREVIEW action type and name', () => {
      const { type, name } = BikeshedBuilderActions.preview('name')
      expect(type).to.equal(BikeshedBuilderConstants.PREVIEW)
      expect(name).to.equal('name')
    })
  })
})
