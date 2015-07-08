import BikeshedBuilderConstants from '../constants/BikeshedBuilderConstants'
import browserImageSize from 'browser-image-size'

export function navigateAction (context) {
  context.dispatch(BikeshedBuilderConstants.RESET)
}

export function inputChange (context, payload) {
  context.dispatch(BikeshedBuilderConstants.INPUT_CHANGE, payload)
}

export function submit () {
  console.warn('@TODO submit')
}

const { FileList, File } = global
export async function addImages (context, images: FileList) {
  images = await Promise.all(
    Array.from(images).map(getImageSize)
  )

  context.dispatch(BikeshedBuilderConstants.ADD_IMAGES, images)
}

function getImageSize (file: File) {
  return browserImageSize(file)
    .then(({ width, height }) => {
      return { file, width, height }
    })
}

export function removeImage (context, image: string) {
  console.warn('@TODO addImages')
}

export function preview (context, image: string) {
  console.warn('@TODO addImages')
}
