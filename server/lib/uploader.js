/**
 * Uploader
 * @flow
 */
import s3 from 'multer-s3'
import multer from 'multer'

const ALLOWED_MIMETYPES = ['image/jpeg', 'image/png']

function fileFilter (req, file, cb) {
  const hasAllowedMimetype = ALLOWED_MIMETYPES.includes(file.mimetype)
  const hasRequestId = !!req.requestId

  const isAllowed = hasAllowedMimetype && hasRequestId
  cb(null, isAllowed)
}

function filename (req, file, cb) {
  if (!req.requestId) {
    cb(new Error('Must have requestId'))
  } else {
    cb(null, `${req.requestId}/${file.fieldname}`)
  }
}

export default function createUploader (config: Object): Function {
  const uploader = multer({
    fileFilter,
    limit: {
      fileSize: 2e6, // 2MB
      fields: 10,
      files: 5
    },
    storage: s3({
      filename,
      bucket: 'bshed',
      dirname: 'uploads/images',
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
  }, {
    name: 'image5',
    maxCount: 1
  }, {
    name: 'image6',
    maxCount: 1
  }, {
    name: 'image7',
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
