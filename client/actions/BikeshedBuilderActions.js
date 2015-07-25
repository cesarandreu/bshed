/**
 * BikeshedBuilderActions
 * @flow
 */
import BikeshedBuilderConstants from '../constants/BikeshedBuilderConstants'
import browserImageSize from 'browser-image-size'
const { FormData, FileList, File } = global

export function reset () {
  return {
    type: BikeshedBuilderConstants.RESET
  }
}

export function inputChange (input: { value: string; name: string; }) {
  const { value, name } = input
  return {
    type: BikeshedBuilderConstants.INPUT_CHANGE,
    value,
    name
  }
}

export function submit () {
  return async (dispatch, getState) => {
    const { bikeshedBuilder } = getState()
    dispatch({ type: BikeshedBuilderConstants.SUBMIT_START })
    try {
      const form = getFormBody(bikeshedBuilder)
      console.log('form', form)
    } finally {
      dispatch({ type: BikeshedBuilderConstants.SUBMIT_FINISH })
    }
  }

  function getFormBody (bikeshedBuilder) {
    const images = bikeshedBuilder.get('images').toList()
    const form = images.reduce((form, image, idx) => {
      const { file, name } = image
      form.set(`file${idx}`, file, name)
      return form
    }, new FormData())

    const description = bikeshedBuilder.get('description')
    form.set('description', description)

    return form
  }
}

export function addImages (imageList: FileList) {
  return async dispatch => {
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

export function removeImage (name: string) {
  return {
    type: BikeshedBuilderConstants.REMOVE_IMAGE,
    name
  }
}

export function preview (name: string) {
  return {
    type: BikeshedBuilderConstants.PREVIEW,
    name
  }
}
