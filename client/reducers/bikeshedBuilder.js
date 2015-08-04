/**
 * bikeshedBuilder reducer
 * @flow
 */
import BikeshedBuilderConstants from '../constants/BikeshedBuilderConstants'
import ApplicationConstants from '../constants/ApplicationConstants'
import createReducer from '../lib/createReducer'
import { URL } from '../lib/browser'
import Immutable from 'immutable'

// Record types
export const BikeshedBuilderImage = Immutable.Record({
  height: null,
  width: null,
  name: null,
  file: null,
  url: null
}, 'BikeshedBuilderImage')

export const BikeshedBuilderState = Immutable.Record({
  images: Immutable.OrderedMap(),
  createdBikeshed: 0,
  submitting: false,
  description: '',
  preview: ''
}, 'bikeshedBuilderState')

// bikeshedBuilder reducer
export default createReducer(new BikeshedBuilderState(), {
  /**
   * Revoke all image URLs and reset state
   */
  [BikeshedBuilderConstants.RESET] (state: BikeshedBuilderState) {
    state.get('images').forEach(image => {
      URL.revokeObjectURL(image.get('url'))
    })

    return new BikeshedBuilderState()
  },

  /**
   * Form submission
   */
  [BikeshedBuilderConstants.SUBMIT] (
    state: BikeshedBuilderState,
    { payload, error, sequence }
  ) {
    if (sequence.type === 'start') {
      return state.set('submitting', true)
    }

    if (sequence.type === 'done') {
      state = state.set('submitting', false)
    }
    if (!error) {
      state = state.set('createdBikeshed', payload.bikeshed.id)
    }
    return state
  },

  /**
   * Open image preview modal
   * @param {Object} payload
   * @param {string} payload.name
   */
  [BikeshedBuilderConstants.PREVIEW] (
    state: BikeshedBuilderState,
    { payload: { name } }
  ) {
    const preview = state.getIn(['images', name], '')
    return state.set('preview', preview)
  },

  /**
   * Add images until the limit is reached
   * Skips repeated names
   * Creates url per image
   * @param {Object} payload
   * @param {Array<InputImage>} payload.imageList
   */
  [BikeshedBuilderConstants.ADD_IMAGES] (
    state: BikeshedBuilderState,
    { payload: { imageList } }
  ) {
    const images = state.get('images').withMutations(images => {
      return imageList.reduce((images, image) => {
        const hasValidCount = images.count() < ApplicationConstants.MAXIMUM_IMAGE_COUNT
        const hasValidName = !images.has(image.name)
        if (hasValidName && hasValidCount) {
          images.set(image.name, new BikeshedBuilderImage({
            url: URL.createObjectURL(image.file),
            ...image
          }))
        }
        return images
      }, images)
    })

    return state.set('images', images)
  },

  /**
   * Revoke url and remove image
   * @param {Object} payload
   * @param {string} payload.name
   */
  [BikeshedBuilderConstants.REMOVE_IMAGE] (
    state: BikeshedBuilderState,
    { payload: { name } }
  ) {
    URL.revokeObjectURL(state.get(['images', name, 'url']))
    return state.removeIn(['images', name])
  },

  /**
   * Update form input
   * @param {Object} payload
   * @param {string} payload.name
   * @param {string} payload.value
   */
  [BikeshedBuilderConstants.INPUT_CHANGE] (
    state: BikeshedBuilderState,
    { payload: { name, value } }
  ) {
    return state.set(name, value)
  }
})
