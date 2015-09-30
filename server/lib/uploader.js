/**
 * Upload
 * @flow
 */
import s3 from 'multer-s3'
import multer from 'multer'

export default function createUpload (config: Object): Function {
  const uploader = multer({
    storage: s3({
      dirname: 'uploads/images',
      bucket: 'bshed',
      ...config
    })
  })
  .fields([{
    name: 'image0',
    maxCount: 1
  }, {
    name: 'image1',
    maxCount: 1
  }, {
    name: 'image2',
    maxCount: 1
  }, {
    name: 'image3',
    maxCount: 1
  }, {
    name: 'image4',
    maxCount: 1
  }])

  return function performUpload (req, res) {
    return new Promise((resolve, reject) => {
      uploader(req, res, err =>
        err ? reject(err) : resolve()
      )
    })
  }
}
