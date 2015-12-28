/**
 * Uploader
 * @flow
 */
import {
  ALLOWED_MIMETYPES,
  MAXIMUM_IMAGE_COUNT,
  MAXIMUM_IMAGE_SIZE
} from 'bshed-constants'
import debug from 'debug'
import multer from 'multer'
import s3 from 'multer-s3'
import { times } from 'lodash'

const log = debug('server:uploader')
const validFileFields = times(MAXIMUM_IMAGE_COUNT, n => `${n}`)

function fileFilter (req, file, cb) {
  const hasValidField = validFileFields.includes(file.fieldname)
  const hasUserId = !!req.userId
  const hasRequestId = !!req.requestId
  const hasAllowedMimetype = ALLOWED_MIMETYPES.includes(file.mimetype)
  cb(null, hasValidField && hasAllowedMimetype && hasRequestId && hasUserId)
}

function filename (req, file, cb) {
  const { fieldname } = file
  const { userId, requestId } = req
  cb(null, `${userId}/${requestId}/${fieldname}`)
}

export function createUploader (awsConfig: Object): Function {
  const uploader = multer({
    fileFilter,
    limit: {
      fileSize: MAXIMUM_IMAGE_SIZE, // 3MB
      fields: 2, // duration and title
      files: MAXIMUM_IMAGE_COUNT
    },
    storage: s3({
      dirname: 'uploads/images',
      filename,
      ...awsConfig
    })
  })
  .fields([{
    // Bikeshed duration
    maxCount: 1,
    name: 'duration'
  }, {
    // Bikeshed title
    maxCount: 1,
    name: 'title'
  },
  // Bikes
  ...times(MAXIMUM_IMAGE_COUNT, n => ({ maxCount: 1, name: `${n}` }))
  ])

  return function performUpload (req, res) {
    return new Promise((resolve, reject) => {
      uploader(req, res, err =>
        err ? reject(err) : resolve({ body: req.body, files: req.files })
      )
    })
  }
}

// Upload all the files
// @TODO: Use different uploaders depending on the mutation type
export default function uploader (awsConfig: Object): Function {
  const performUpload = createUploader(awsConfig)
  return async function uploaderMiddleware (ctx, next) {
    if (ctx.method === 'POST' && ctx.is('multipart/form-data')) {
      log('performing upload')
      const { body, files } = await performUpload(ctx.req, ctx.res)
      ctx.request.body = body

      // Pull out each file from the inner array
      ctx.request.files = Object.entries(files)
      .reduce((files, [name, [file]]) => {
        files[name] = file
        return files
      }, {})
    }
    return next()
  }
}
