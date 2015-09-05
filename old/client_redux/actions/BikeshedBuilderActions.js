/**
 * BikeshedBuilderActions
 * @flow
 */
import BikeshedBuilderConstants from '../constants/BikeshedBuilderConstants'
import BikeshedBuilderSelector from '../selectors/BikeshedBuilderSelector'
import { createBikeshed } from '../utils/BikeshedApiUtils'
import { FormData, FileList, File } from '../lib/browser'
import browserImageSize from 'browser-image-size'
import uuid from 'node-uuid'

/**
 * Reset bikeshed builder
 */
export function reset () {
  return {
    type: BikeshedBuilderConstants.RESET
  }
}

/**
 * Update bikeshed builder input
 */
export function inputChange (input: { value: string; name: string; }) {
  const { value, name } = input
  return {
    type: BikeshedBuilderConstants.INPUT_CHANGE,
    payload: { value, name }
  }
}

/**
 * Submit bikeshed builder form
 */
export function submit () {
  return async ({ dispatch, getState, fetcher, executeRequest }) => {
    const bikeshedBuilder = BikeshedBuilderSelector(getState())
    const sequenceId = uuid.v4()
    dispatch({
      type: BikeshedBuilderConstants.SUBMIT,
      sequence: {
        type: 'start',
        id: sequenceId
      }
    })

    const body = getRequestBody(bikeshedBuilder)
    const response = await executeRequest(createBikeshed, { body })
    if (response.ok) {
      const bikeshed = await response.json()
      dispatch({
        type: BikeshedBuilderConstants.SUBMIT,
        payload: { bikeshed },
        sequence: {
          type: 'done',
          id: sequenceId
        }
      })
    } else {
      const text = await response.text()
      const error = new Error(text)
      error.status = response.status

      dispatch({
        type: BikeshedBuilderConstants.SUBMIT,
        payload: error,
        error: true,
        sequence: {
          type: 'done',
          id: sequenceId
        }
      })
    }
  }

  function getRequestBody (bikeshedBuilder) {
    const images = bikeshedBuilder.images.toList()
    const form = images.reduce((form, image, idx) => {
      const { file, name } = image
      form.append(`file${idx}`, file, name)
      return form
    }, new FormData())

    form.append('description', bikeshedBuilder.description)

    return form
  }
}

/**
 * Add images to bikeshed builder
 */
export function addImages (imageList: FileList) {

  return async ({ dispatch }) => {
    imageList = await Promise.all(
      Array.from(imageList).map(getImageSize)
    )

    dispatch({
      type: BikeshedBuilderConstants.ADD_IMAGES,
      payload: { imageList }
    })
  }

  function getImageSize (file: File) {
    const { name } = file
    return browserImageSize(file).then(size => {
      return { file, name, ...size }
    })
  }
}

/**
 * Remove image from bikeshed builder
 */
export function removeImage (name: string) {
  return {
    type: BikeshedBuilderConstants.REMOVE_IMAGE,
    payload: { name }
  }
}

/**
 * Set bikeshed builder image preview
 */
export function preview (name: string) {
  return {
    type: BikeshedBuilderConstants.PREVIEW,
    payload: { name }
  }
}
