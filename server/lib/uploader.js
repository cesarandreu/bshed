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
    name: 'images0',
    maxCount: 1
  }, {
    name: 'images1',
    maxCount: 1
  }, {
    name: 'images2',
    maxCount: 1
  }, {
    name: 'images3',
    maxCount: 1
  }, {
    name: 'images4',
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
