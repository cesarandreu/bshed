/**
 * BikeshedBuilderActions
 * @flow
 */
import BikeshedBuilderConstants from '../constants/BikeshedBuilderConstants'
import { createBikeshed } from '../utils/BikeshedApiUtils'
import browserImageSize from 'browser-image-size'
const { FormData, FileList, File } = global

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
    value,
    name
  }
}

/**
 * Submit bikeshed builder form
 */
export function submit () {
  return async ({ dispatch, getState, fetcher }) => {
    const { bikeshedBuilder } = getState()
    dispatch({ type: BikeshedBuilderConstants.SUBMIT_START })
    try {
      const body = getRequestBody(bikeshedBuilder)
      const response = await fetcher.executeRequest(createBikeshed, { body })
      if (response.ok) {
        const bikeshed = await response.json()
        dispatch({ type: BikeshedBuilderConstants.SUBMIT_SUCCESS, bikeshed })
      } else {
        // @TODO: do something on failure
      }
    } finally {
      dispatch({ type: BikeshedBuilderConstants.SUBMIT_FINISH })
    }
  }

  function getRequestBody (bikeshedBuilder) {
    const images = bikeshedBuilder.get('images').toList()
    const form = images.reduce((form, image, idx) => {
      const { file, name } = image
      form.append(`file${idx}`, file, name)
      return form
    }, new FormData())

    const description = bikeshedBuilder.get('description')
    form.append('description', description)

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
      imageList
    })
  }

  function getImageSize (file: File) {
    const { name } = file
    return browserImageSize(file).then(size =>
      ({ file, name, ...size })
    )
  }
}

/**
 * Remove image from bikeshed builder
 */
export function removeImage (name: string) {
  return {
    type: BikeshedBuilderConstants.REMOVE_IMAGE,
    name
  }
}

/**
 * Set bikeshed builder image preview
 */
export function preview (name: string) {
  return {
    type: BikeshedBuilderConstants.PREVIEW,
    name
  }
}
