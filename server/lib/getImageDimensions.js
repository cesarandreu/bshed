/**
 * Given an image's path, get its height and width
 * Example:
 *  getImageDimensions('./foo.png').then({ width, height } => {
 *    console.log({ width, height })
 *  })
 * @flow
 */
import imageSize from 'image-size'

type ImageDimensions = {
  height: number,
  width: number
}

export default function getImageDimensions (imagePath: string): Promise {
  return new Promise((resolve, reject) => {
    imageSize(imagePath, (err, { width, height }: ImageDimensions) => {
      err ? reject(err) : resolve({ width, height })
    })
  })
}
